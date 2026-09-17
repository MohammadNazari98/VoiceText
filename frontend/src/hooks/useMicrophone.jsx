import { useEffect, useRef, useState } from "react";


export const useMicrophone = () =>{
    const [isRecording, setIsRecording] = useState(false)
    const [audioStream,setAudioStream] = useState(null)
    const [error, setError] = useState(null)
    const mediaRecorderRef = useRef(null)
    const audioChunksRef = useRef([])

    const requestMicrophoneAccess = async() => {
        try{
            const stream = navigator.mediaDevices.getUserMedia({audio: true})
            console.log(stream);
            
            setAudioStream(stream)
            setError(null)
            return stream
        }
        catch (err)
        {
            console.error("خطا در دسترسی به میکروفن",err)
            setError(err)
            return false
        }
    }
    const startRecording = (stream) => {
        console.log("in StartRecording:",stream);
        
        if (!stream){
            console.error("ابتدا دسترسی میکروفن را بگیرید.")
            return 
        }
    
        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorderRef.current = mediaRecorder
        audioChunksRef.current = []
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0){
                audioChunksRef.current.push(event.data)
            }
        }
    
        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, {type: "audio/wav"})
            const audioUrl = URL.createObjectURL(audioBlob)
            console.log("ضبط تموم شد:");
            const downloadLink = document.createElement('a');
            downloadLink.href = audioUrl;
            downloadLink.download = 'my_recording.wav';
            downloadLink.click();
        }
        mediaRecorder.start()
        setIsRecording(true)
    }
    
    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording)
        {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
        }
    }
    
    const closeMicrophone = () => {
        if(audioStream){
            audioStream.getTracks().forEach(track => track.stop())
            setAudioStream(null)
        }
    }
    
    useEffect(()=>{
        return ()=>{
            closeMicrophone()
        }
    },)
    return {
        isRecording,
        audioStream,
        error,
        requestMicrophoneAccess,
        startRecording,
        stopRecording,
        closeMicrophone
    }
}

