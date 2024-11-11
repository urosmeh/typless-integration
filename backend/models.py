from typing import List
from sqlalchemy import Column, Integer, Double, String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, relationship
from database import Base
 

class ExtractedFieldValueModel(Base):
    __tablename__ = "extracted_field_value"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    confidence_score = Column(Double)
    value = Column(String)

    extracted_field_id = Column(ForeignKey("extracted_field.id"))
    extracted_field: Mapped["ExtractedFieldModel"] = relationship(back_populates="values")


class ExtractedFieldModel(Base):
    __tablename__ = "extracted_field"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    data_type = Column(String, index=True)
    multiple_values = Column(Boolean)
    extracted_data_id = Column(ForeignKey("extracted_data.id"))

    values: Mapped[List["ExtractedFieldValueModel"]] = relationship(back_populates="extracted_field")
    extracted_data: Mapped["ExtractedDataModel"] = relationship(back_populates="extracted_fields")


class ExtractedDataModel(Base):
    __tablename__ = "extracted_data"
    id = Column(Integer, primary_key=True, index=True)
    object_id = Column(String, index=True)
    file_name = Column(String, index=True)
    customer = Column(String, nullable=True)
    adjusted_s3_url = Column(String)

    extracted_fields: Mapped[List[ExtractedFieldModel]] = relationship(back_populates="extracted_data")
