from fastapi import APIRouter, status, HTTPException, Request
from ..schemas.tts import RequestTTS
from ..utils.helpers import get_text_to_audio

router = APIRouter(tags=["tts"])

@router.post("/tts",status_code=status.HTTP_200_OK)
async def request_text_to_server(request: RequestTTS,r: Request) -> None:
    try:
        print(request.model_dump())
        base_url = str(r.base_url).rstrip("/")
        data = request.model_dump()
        file_unique = get_text_to_audio(data["text"])
        download_url = f"{base_url}/download/{file_unique.name}"
        serve_audio_url = f"{base_url}/audio/{file_unique.name}"
        return {
            "message": "received file from server successfully.",
            "data":{
                "text": data["text"],
                "file": file_unique.name,
                "download_url": download_url,
                "serve_audio": serve_audio_url
            }
        }
    except Exception as ex:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"خطا در ساخت فایل صوتی:{str(ex)}"
        )
