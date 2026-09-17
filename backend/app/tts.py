from TTS.api import TTS
from pathlib import Path
# from TTS.tts.configs.glow_tts_config import GlowTTSConfig
# from TTS.tts.models.glow_tts import GlowTTS
# from TTS.utils.audio import AudioProcessor
# from TTS.tts.utils.text.tokenizer import TTSTokenizer
# import torch
from TTS.utils.synthesizer import Synthesizer

# print(TTS.models)
# tts = TTS()
# for model in tts.models:
#     print(model)

# os.environ["TRAINER_ANALYTICS_ENABLED"] = "false"
# # os.environ["HF_HUB_DISABLE_TELEMETRY"] = "1"

# # print(TTS.models)

model_path = Path().resolve() / "app" / "models" / "persian_tts" / "glow-tts" / "model_file.pth"
config_path = Path().resolve() / "app" / "models" / "persian_tts" / "glow-tts" / "config.json" 
output_path = Path().resolve() / "app" / "temp"

# tts = TTS(model_path=model_path.as_posix(),config_path=config_path.as_posix())
# TTS.is_multi_lingual = property(lambda self: False)

# tts.tts_to_file(text="«موفقیت، پله‌کانِ عجیبی است؛ نمی‌توانی از آن بالا بروی در حالی که دستانت در جیب‌هایت باشد.»",file_path="output.wav",speaker_wav="./temp/output.wav")


# tokenizer, config = TTSTokenizer.init_from_config(config_path.as_posix())
# ap = AudioProcessor.init_from_config(config)

# model = GlowTTS(config,ap,tokenizer)
# model.load_checkpoint(config,model_path,eval=True)

text = "«تنها کسی که مانع رسیدن تو به آرزوهایت می‌شود، خودت هستی. قدرت تغییر در دستان توست.»"
# text_inputs = tokenizer.ids_to_text(text)
# outputs = model.inference(
#     torch.tensor(text_inputs).unsqueeze(0),
#     aux_input={"X_lengths": torch.tensor([len(text_inputs)])})
# audio = outputs[0].detach().cpu().numpy()
# ap.save_wav(audio, output_path)

import torch
print(torch.__version__)
print(torch.cuda.is_available())
print(torch.cuda.get_device_name(0) if torch.cuda.is_available() else "CUDA not available")


synthesizer = Synthesizer(tts_checkpoint=model_path.as_posix(),tts_config_path=config_path.as_posix(),use_cuda=True)

output = synthesizer.tts(text)

synthesizer.save_wav(output,output_path.as_posix())