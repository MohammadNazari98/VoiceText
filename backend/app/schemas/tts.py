from pydantic import BaseModel, Field
from pydantic import field_validator
import re

class RequestTTS(BaseModel):
    text: str = Field()
    
    @field_validator("text")
    @classmethod
    def validation_text(cls,v : str):
        if not re.search(r"[\u0600-\u06FF]",v):
            raise ValueError("متن باید فارسی باشد.")
        if len(v) < 5:
            raise ValueError("متن باید حداقل 5 کاراکتر باشد.")
        if len(v) > 300:
            raise ValueError("متن باید حداکثر 300 کاراکتر باشد.")
        
        return v
        
    model_config = {
        "json_schema_extra": {
            "example": {
                "text": "سلام، این متن فارسی است."
            }
        }
    }
