import axios from "axios"
import { useEffect, useRef, useState } from "react"

const ViewSound = (props) => {
    const [loading,setLoading] = useState(false)
    const [urlDownload, seturlDownload] = useState()
    const AudioRef = useRef()
    const BlobUrlRef = useRef()
    const isLoadedRef = useRef()

    

    const loadAudioAsBlob = async () => {
        setLoading(true)
        try{
            if(BlobUrlRef.current){
                URL.revokeObjectURL(BlobUrlRef.current)
                BlobUrlRef.current = null; 
                console.log("Previous blob URL revoked before new one.");
            }
            const response = await axios.get(props.urlServe,
            {
                responseType:"blob",
                headers:{
                "X-Requested-With": "XMLHttpRequest"
                }
            })
            
            const blobUrl = URL.createObjectURL(response.data)
            BlobUrlRef.current = blobUrl
            if(AudioRef.current){
                AudioRef.current.src = blobUrl
                AudioRef.current.load()
                isLoadedRef.current = true
            }
        }catch(error){
            console.log(`Error file loading: ${error}`);
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        const loadAndSetupAudio = async ()=>{
            if(props.urlServe){
                loadAudioAsBlob()
            }
        }
        loadAndSetupAudio()
        seturlDownload(props.urlDownload)
        return ()=>{
            if(BlobUrlRef.current){
                URL.revokeObjectURL(BlobUrlRef.current)
                BlobUrlRef.current = null
                console.log("Revoked previous blob URL.");
            }
        }
    },[props.urlServe,props.urlDownload])

    const DownloadHandler = () => {
        const link = document.createElement("a")
        link.href = urlDownload
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        seturlDownload('')
    }
    
    return (
        <>        
            <h2 className="h2 my-3 text-primary">نمایش صوتی</h2>
            {(loading) && <p className="text-color">در حال بارگذاری فایل صوتی</p>}
            <div>
                <audio controls className="w-100"  ref={AudioRef}>
                </audio>
                <button onClick={DownloadHandler} className={(urlDownload)?"btn btn-primary mt-3":"btn btn-primary disabled mt-3"} disabled={!urlDownload}>
                    دریافت فایل آماده
                </button>
            </div>
        </>
    )
}

export default ViewSound