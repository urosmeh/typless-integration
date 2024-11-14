# typless-integration

This is a Vite + React + TypeScript app for integrating typless - [Typless Docs](https://docs.typless.com/docs/start-here). The app allows users to upload a document, view it in the browser, send it to a backend for metadata extraction, edit the metadata fields, and save the data to a database.

## Installation
### Prerequisites
- Node.js 21.7.3 or higher

## With docker:
### 1. build:
```bash
docker build -t typless-fe . 
```

### 2. run:
```bash
docker run -p 5173:5173 typless-fe --name typless-fe-container
```

## Without docker:
### 1. install dependencies:
```bash
npm install
```
### 2. create `env.local` file
### 3. copy contents from `env.example` to `env.local` or write own
### 4. run the app:
```bash
npm run dev
```
### 5. run the tests (optional):
```bash
npm run test
```

### Open http://localhost:5173/
