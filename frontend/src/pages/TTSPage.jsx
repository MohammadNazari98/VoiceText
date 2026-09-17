import { useState } from "react";
import Card from "../components/Card";
import FormTTS from "../components/TTS/FormTTS";
import ViewSound from "../components/TTS/ViewSound";

const TTSPage = () => {
    const [urls, setUrl] = useState()
    const [urlsServe, setUrlServe] = useState()
    const changeFileUrlDownload = (UrlDownload) => {
        setUrl(UrlDownload)
        
    }
    const changeFileUrlServe = (urlServe) => {
        setUrlServe(urlServe)
        
    }
    return (
    <div className={urls} >
        <Card>
            <h1 className="h1 my-3 card-title display-1--title text-primary">
            تبدیل متن به صوتی
            </h1>
            <div className="card-text">
                <div className="row">
                    <FormTTS onchangeFileUrlDownload={changeFileUrlDownload} onchangeFileUrlServe={changeFileUrlServe}/>
                </div>
                <div className="row">
                    <ViewSound urlDownload={urls} urlServe={urlsServe} />
                </div>
            </div>
        </Card>
    </div>
    );
};

export default TTSPage;
