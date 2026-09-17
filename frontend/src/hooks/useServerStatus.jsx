import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import BASE_URL from "../config/api"

const useServerStatus = (serverUrl = BASE_URL, intervalTime = 10000) => {
const [isConnected, setIsConnected] = useState(false)
const [isChecking, setIsChecking] = useState(false)
const [error, setError] = useState("")

const checkConnection = useCallback(async () => {
    setIsChecking(true)
    try {
    const response = await axios.get(serverUrl,{timeout:60000})

    if (response.status === 200) {
        setIsConnected(true)
        setError("")
    }
    } catch (err) {
    setIsConnected(false)

    if (err.code === "ECONNABORTED") {
        setError("مدت زمان اتصال به پایان رسید.")
    } else if (err.response) {
        setError(`خطای سرور: ${err.response.status}`)
    } else if (err.request) {
        setError("سرور در دسترس نیست.")
    } else {
        setError(err.message)
    }

    console.error("خطای سرور:", err)
    } finally {
    setIsChecking(false)
    }
}, [serverUrl])

useEffect(() => {
    const timeoutId = setTimeout(() => {
    checkConnection()
    }, 0)

    const intervalId = setInterval(() => {
    checkConnection()
    }, intervalTime)

    return () => {
    clearTimeout(timeoutId)
    clearInterval(intervalId)
    }
}, [checkConnection, intervalTime])

return { retry: checkConnection, isChecking, isConnected, error }
}

export default useServerStatus
