import { useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";


const FormTTS = (props) => {
    const [text, setText] = useState('سلام خوبی')
    const [loading, setLoader] = useState(false)
    const [error,setError] = useState('')

    const textChangeHandler = (event) => {
        setText(event.target.value)
    }

    const submitHandler = async (event) => {
        event.preventDefault()

        const TTSData = {
            "text" : text
        }
        try{
            setLoader(true)
            setError('')
            const response = await axios.post(`${API_ENDPOINTS.TTS}`,TTSData,{
                headers:{
                    "Content-Type": "application/json"
                }
            })            
            if (response.status === 200)
            {
                console.log("موفقیت:",response.data);
                const audio_url = response.data.data.download_url
                const serve_audio = response.data.data.serve_audio
                props.onchangeFileUrlDownload(audio_url)
                props.onchangeFileUrlServe(serve_audio)
                setText('')
                setError('')
                setLoader(false)
            }
        }
        catch(err){
            if(err.response?.status == 400){
                const errorMessage = err.response.data.error || 'متن وارد شده معتبر نیست.'
                setError(errorMessage)
                setLoader(false)
            }
            else{
                setError("خطا در سرور رخ داده است. "+(err.message || "باگ ناشناخته"))
                setLoader(false)
            }
        }
    }
    
    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <textarea
                    className={error? "form-control is-invalid":"form-control"}
                    name="text"
                    id="text"
                    placeholder="متن را بنویسید."
                    rows="10"
                    onChange={textChangeHandler}
                    required
                    value={text}
                    >
                    </textarea>
                    {error && (
                        <div className="invalid-feedback d-block">
                            {error}
                        </div>
                    )}
                </div>
                <div>
                    <input type="submit" value="ارسال" className={(!loading)?"btn btn-primary mt-3":"btn btn-primary disabled mt-3"} disabled={loading} />
                    {loading && <p className="fs-3 fw-bold text-color">یکم صبر کنید تا اطلاعات شما پردازش شود...</p>}
                </div>
            </form>
        </>
    );
};

export default FormTTS;
