import { useMicrophone } from "../../hooks/useMicrophone"

const MicrophoneRecorder = () => {
    const {
        isRecording, 
        error,
        requestMicrophoneAccess,
        startRecording,
        stopRecording
    } = useMicrophone()

    const EnableMicHandler = async () => {
        // check microphone is disable
        if (!isRecording) 
        {
            const granted = await requestMicrophoneAccess()
            if (granted){
                startRecording(granted)
            }
        }
        else{
            stopRecording()
        }
        
    }
    return (
        <div className="border rounded py-2 px-4 w-100">
            <label htmlFor="labelMic" className="form-label w-100 mic-label">فعال کردن میکروفن:</label>
            <button type="submit" 
                    className="btn btn-lg btn-outline-secondary" 
                    title="فعال کردن میکروفن" onClick={()=>EnableMicHandler()}>
            <i className={(isRecording)? 'fa-solid pulse-animation' : "fa-solid fa-microphone"}></i>
            </button>
            {(isRecording) && <p className="text-danger mt-2" id="msg-mic">حالا صحبت کنید...</p>}               
            {(error) && <p className="text-danger mt-2">خطا در دسترسی به میکروفن: {error}</p>}             
        </div>
    )
}

export default MicrophoneRecorder