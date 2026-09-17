from fastapi.exceptions import RequestValidationError,HTTPException
from fastapi import FastAPI, status, Request, BackgroundTasks
from fastapi.responses import FileResponse, JSONResponse
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.middleware.cors import CORSMiddleware
from .utils.helpers import delete_file_after_delay
from fastapi.staticfiles import StaticFiles
from .core.config import TEMP_DIR,origins
from .api import tts,stt
import asyncio
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tts.router,prefix="/api")
app.include_router(stt.router,prefix="/api")


# app.mount('/',StaticFiles(directory= 'app/static',html=True), name='spa')


index_path = os.path.join("static", "index.html")

@app.exception_handler(RequestValidationError)
async def validation_handler(request: Request, ex: RequestValidationError):
    error_message = ex.errors()[0]["msg"].replace("Value error, ","")
    return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST,content={"error":error_message})

# @app.get('/',status_code=status.HTTP_200_OK)
# async def serve_spa():
#     if os.path.exists(index_path):
#         return FileResponse(index_path)
#     return {'message': "frontend not created yet. Run 'npm run build' in frontend folder."}

@app.get("/",status_code=status.HTTP_200_OK)
async def serve():
    return {
        "message": "The server is available yet."
    }

@app.get("/test",status_code=status.HTTP_200_OK)
async def test_api():
    return {"message": "Fastapi is working now!"}


@app.get("/audio/{filename}")
async def serve_audio(request : Request,filename: str):
    file_path = TEMP_DIR / filename
    
    asyncio.create_task(delete_file_after_delay(file_path))
    if not file_path.exists():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"فایل پیدا نشد یا به مدت 300 ثانیه به طور خودکار حذف شده است یا به طور کلی حذف شده است.")
    
    return FileResponse(file_path,media_type="audio/wav",filename=filename,headers={"Content-Disposition":"inline"})

@app.get("/download/{filename}")
async def download_audio(filename: str,background_tasks: BackgroundTasks):
    file_path = TEMP_DIR / filename
    
    if not file_path.exists():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"فایل پیدا نشد یا به مدت 300 ثانیه به طور خودکار حذف شده است یا به طور کلی حذف شده است.")
    
    if file_path.stat().st_size == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"فایل خالی است.")
    
    print(f"downloading file... {file_path}")
    background_tasks.add_task(lambda: os.remove(file_path) if file_path.exists() else None)
    return FileResponse(file_path,media_type="application/octet-stream",filename=filename,headers={"Content-Disposition":"attachment"})