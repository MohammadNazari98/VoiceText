import { useRef, useState } from "react";
import axios from "axios"
import {API_ENDPOINTS} from "../../config/api"

const FormSTT = (props) => {
    const [isActive,setActive] = useState(false) 
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const inputRef = useRef(null)
    const [fileInfo,setFileInfo] = useState({
        name: '',
        type: ''
    })
    const submitHandler = async (event) => {
        event.preventDefault()
        if(!inputRef.current.files.length) return setError("هیچ فایلی انتخاب نشده است.")

        const formData = new FormData()
        formData.append("file",inputRef.current.files[0])
        
        try{
            setLoading(true)
            console.log(formData);            
            const response = await axios.post(API_ENDPOINTS.STT,formData)
            if(response.status === 200)
            {
                props.onAddTextHandler(response.data.data.text)
                console.log("received data successfully.");
                setError('')
                setActive(false)
                inputRef.current.value = null
            }
            else{
                setError(response.data)
            }
        }catch(err){
            setError(
                err.response?.data?.message || err.response?.data?.detail || err.response?.data?.error || 'خطا در سرور رخ داد.')
        }
        finally{
            setLoading(false)
        }
    }

    const DragFileHandler = () => {
        inputRef.current.click()
    }
    
    const changeFileHandler = () => {
        const file = inputRef.current.files[0]
        console.log(file);
        
        if (file){
            setFileInfo({
                name: file.name,
                type: file.type
            })
            setActive(true)
        }
        else{
            setActive(false)
            setFileInfo({
                name: '',
                type: ''
            })
        }
    }
    return (
        <form encType="multipart/form-data" onSubmit={submitHandler}>
        <div className="d-flex justify-content-start flex-wrap">
            <label htmlFor="formFile" className="form-label w-100 d-none">
            آپلود فایل صوتی:
            </label>
            <div className="upload-file-div" onClick={DragFileHandler} disabled={loading}>
                {(!isActive) && <p> برای آپلود کردن فایل صوتی را کلیک کنید.</p>}  
                {(isActive) && <div className="d-flex flex-column text-success">
                    <i className="fa-solid fa-file-audio"></i>
                    <b>{fileInfo.name}</b>
                </div>}
            </div>
            <input
            type="file"
            name="file"
            className={(error)?"form-control w-auto visually-hidden is-invalid":"form-control w-auto visually-hidden"}
            ref={inputRef}
            required
            accept=".wav, .mp3, .ogg, .m4a"
            onChange={changeFileHandler}
            />
            {(error) && <div className="invalid-feedback">{ error }</div>}            
        </div>
        <input type="submit" className={(loading)?"btn btn-primary mt-3 disabled":"btn btn-primary mt-3"} disabled={loading} value="ارسال" />
        {loading && <p className="fs-3 fw-bold text-color">یکم صبر کنید تا اطلاعات شما پردازش شود...</p>}
        </form>
    );
};
export default FormSTT;
