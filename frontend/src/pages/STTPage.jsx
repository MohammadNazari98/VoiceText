import Card from "../components/Card"
import FormSTT from "../components/STT/FormSTT"
import ViewText from "../components/STT/ViewText"
import MicrophoneRecorder from "../components/STT/MicrophoneRecorder"
import { useState } from "react"

const STTPage = () => {
    const [text,setText] = useState('')
    const AddTextHandler = (text) => {
        setText(text)
    }
    return (
        <div className="row">
            <Card>
                <h1 className="h1 my-3 card-title text-primary">تبدیل صوتی به متن</h1>
                <div className="card-text">
                    <div className="row">
                    <div className="d-flex gap-2 flex-wrap flex-lg-nowrap flex-sm-wrap">
                        <div className="border rounded py-2 px-4 w-100">
                            <FormSTT onAddTextHandler={AddTextHandler}/>
                        </div>
                        <MicrophoneRecorder />
                    </div>
                    </div>
                    <div className="row">
                        <ViewText newText={text} />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default STTPage