from fastapi import APIRouter,status, File,UploadFile,HTTPException
from ..utils.helpers import get_audio_to_text
from pathlib import Path


router = APIRouter(tags=["stt"])

@router.post("/stt",status_code=status.HTTP_200_OK)
async def request_sound_to_server(file : UploadFile = File()):
    ALLOWED_EXTENSIONS = [".mp3", ".wav", ".ogg", ".m4a"]
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="فرمت فایل معتبر نیست. فرمت‌های مجاز: .mp3, .wav, .ogg, .m4a"
)
    text = get_audio_to_text(file)
    return {
        "message": "received message from server successfully.",
        "data":{
            "text": text
        }
    }
