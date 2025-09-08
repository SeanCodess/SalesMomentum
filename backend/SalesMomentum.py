# backend/SalesMomentum.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import shutil
from analysis import analyze_sales

app = FastAPI()

# Allow frontend during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "SalesMomentum backend is running"}

@app.post("/api/analyze")
async def analyze(file: UploadFile = File(...)):
    # Save uploaded file
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Run analysis
    result = analyze_sales(temp_path)
    return result

@app.get("/api/plot")
def get_plot():
    # Serve the most recent plot file
    return FileResponse("sales_trajectory.png")
