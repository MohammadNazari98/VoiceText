from pydantic import BaseModel,field_validator
from fastapi import UploadFile, File
from pathlib import Path

ALLOWED_EXTENSIONS = [".mp3", ".wav", ".ogg", ".m4a"]
class RequestSTT(BaseModel):
    file: UploadFile = File()
    
    @classmethod
    @field_validator("file")
    def validation_file(cls,v):
        if v.filename == "":
            raise ValueError("هیچ فایلی آپلود نشده است.")
        ext = Path(v.filename).suffix.lower()
        if ext not in ALLOWED_EXTENSIONS:
            raise ValueError(f"فرمت فایل معتبر نیست، {'، '.join(ALLOWED_EXTENSIONS)} مجاز هستند.")
        return v