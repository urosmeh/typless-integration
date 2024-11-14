# typless-integration (backend)

This is a FastAPI backend for the integrating typless
services ([Typless Docs](https://docs.typless.com/docs/start-here)). The backend handles file uploads from frontend app
and communicates with typless services to retrieve document metadata. It also connects to database to save metadata
fields that come back from frontend.

## Installation

### Prerequisites

- python 3.13 or higher
- docker (optional but preferred)

# With docker

### 1. create db file i.e.: `database.py` in app root.

### 2. create `env` file

### 3. copy contents from `.env.example` to `.env` or write own

+ make sure to link sqlite db file correctly. Example for `database.py`:
+ `sqlite:///./database.db`

### 4. build:

```bash
docker build -t typless-integration-backend .
```

### 5. run:

```bash
docker run -e PORT=8080 -p 8080:8080 --name typless-container typless-integration-backend
```

# Without docker

### 1. [install python](https://www.python.org/downloads/)

### 2. create and activate venv

```bash
source .venv/bin/activate
```

or if you use windows:

```bash
.venv\Scripts\Activate.ps1
```

### 3. install dependencies

```bash
pip install -r requirements.txt
```

### 4. create db file i.e.: `database.py` in app root.

### 5. create `env` file

### 6. copy contents from `.env.example` to `.env` or write own

+ make sure to link sqlite db file correctly. Example for `database.py`:
+ `sqlite:///./database.db`

### 7. run the app:

```bash
uvicorn main:app --host 0.0.0.0 --port 8080 --reload
```

Access docs: (http://localhost:8080/docs)