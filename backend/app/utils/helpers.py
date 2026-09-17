import whisper 
import shutil
from TTS.api import TTS
from pathlib import Path
from ..core.config import TEMP_DIR, WHISPER_DIR, TTS_DIR
import uuid
import asyncio
import os



_whisper_model = None
_tts_model = None

def get_model_tts():
    global _tts_model
    if _tts_model is None:
        _tts_model = TTS(
            model_path=str(TTS_DIR / "best_model_199921.pth"),
            config_path=str(TTS_DIR / "config.json")
        )
        TTS.is_multi_lingual = property(lambda self:False)
    return _tts_model

def get_model_stt():
    global _whisper_model
    if _whisper_model is None:
        _whisper_model = whisper.load_model(
            "small",
            download_root=str(WHISPER_DIR)
        )
    return _whisper_model

def normalize_text(text : str) -> str:
    s = "".join(ch for ch in text if ch.isalnum() or ch.isspace() or ".،" in ch)
    return s

def get_text_to_audio(text : str) -> None:
    tts = get_model_tts()
    TEMP_DIR.mkdir(parents=True,exist_ok=True)
    temp_file = TEMP_DIR / f"{uuid.uuid4()}.wav"
    clear_text = normalize_text(text)
    tts.tts_to_file(
        text=clear_text,
        file_path=temp_file
    )
    if not temp_file.exists() or temp_file.stat().st_size == 0:
        raise Exception("خطا در ساخت فایل صوتی")
    return temp_file

def get_audio_to_text(file) -> str:
    stt = get_model_stt()
    temp_path = Path("temp") / file.filename
    temp_path.parent.mkdir(parents=True,exist_ok=True)
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    result = stt.transcribe(str(temp_path),language="fa")
    return result["text"]


async def delete_file_after_delay(path_file: Path, delay_second : int = 300):
    await asyncio.sleep(delay=delay_second)
    try:
        if path_file.exists():
            os.remove(path_file)
            print(f"File has deleted in about {delay_second} second.")
    except Exception as ex:
        print(f"Error file delete:\n{path_file} : {ex}")