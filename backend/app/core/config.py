from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
TEMP_DIR = BASE_DIR / "temp"

WHISPER_DIR = BASE_DIR / "models" / "whisper_stt"
TTS_DIR = BASE_DIR / "models" / "persian_tts" / "huggingface"

origins = [
    "http://localhost:5173", 
    "http://localhost:5173/", 
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5173/",
]