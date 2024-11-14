import base64
from typing import Annotated, List, Optional, Any

import requests
from fastapi import FastAPI, Depends, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette import status
from starlette.responses import JSONResponse

from constants import TyplessEndpoints

from config import Settings

from models import ExtractedDataModel, ExtractedFieldModel, ExtractedFieldValueModel, Base
from database import engine, SessionLocal, settings

origins = [
    "http://localhost:5173",
    "http://localhost:5173/*",
]

Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
app = FastAPI(
    dependencies=[Depends(db_dependency)]
)

app.add_middleware(
    CORSMiddleware,
    # allow_origins=origins,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ExtractedFieldValue(BaseModel):
    confidence_score: float
    height: int
    width: int
    page_number: int
    x: int
    y: int
    value: str


class ExtractedField(BaseModel):
    values: List[ExtractedFieldValue]
    name: str
    data_type: str
    multiple_values: bool


class ExtractData(BaseModel):
    object_id: str
    file_name: str
    customer: Optional[str]
    extracted_fields: List[ExtractedField]
    line_items: List[Any]
    vat_rates: List[Any]
    adjusted_s3_url: str


@app.post("/extract-data")
async def extract_data(file: UploadFile):
    try:
        file_name = file.filename
        file_data = await file.read()
        b64 = base64.b64encode(file_data).decode("utf-8")
    except:
        raise HTTPException(status_code=500, detail="Error occurred while encoding file")

    url = f"{settings.typless_api_root}{TyplessEndpoints.EXTRACT_DATA.value}"

    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": f"Token {settings.typless_api_key}"
    }

    # todo: get document type name from frontend?
    payload = {
        "document_type_name": "simple-invoice",
        "file": b64,
        "file_name": file_name
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Error occurred while connecting to typless api.")

    response.raise_for_status()
    return JSONResponse(content=response.json())


@app.post("/post_data")
def post_data(data: ExtractData, db: db_dependency):
    try:
        new_entry = ExtractedDataModel(
            object_id=data.object_id,
            file_name=data.file_name,
            customer=data.customer,
            adjusted_s3_url=data.adjusted_s3_url,
            extracted_fields=[
                ExtractedFieldModel(
                    name=field.name,
                    data_type=field.data_type,
                    multiple_values=field.multiple_values,
                    values=[
                        ExtractedFieldValueModel(
                            confidence_score=v.confidence_score,
                            value=v.value
                        ) for v in field.values
                    ]
                ) for field in data.extracted_fields
            ]
        )
        db.add(new_entry)
        db.commit()
    except:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR,
                            "An error occurred while saving the record to database!")

    if new_entry.id:
        return JSONResponse(content={"status": new_entry.id is not None}, status_code=status.HTTP_201_CREATED)

    return JSONResponse(content={"status": new_entry.id is not None}, status_code=status.HTTP_400_BAD_REQUEST)
