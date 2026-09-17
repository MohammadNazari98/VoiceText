import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TTSPage from './pages/TTSPage'
import Navbar from './partials/navbar'
import Footer from './partials/footer'
import STTPage from './pages/STTPage'
import NotFoundPage from './pages/NotFoundPage'
import { useEffect, useState } from 'react'
import {Toast, ToastContainer} from "react-bootstrap"
import './assets/css/style.rtl.css'
import useServerStatus from './hooks/useServerStatus'

function App() {
  const [toasts, setToasts] = useState([])
  const { error,isConnected } = useServerStatus()

  const addToast = (message) => {
    if (message && !toasts.some(t => t.message === message)) {
      const id = Date.now()
      const newToast = { id, message }

      setToasts(prev => [...prev, newToast])
    }
  }
  useEffect(()=>{
    if (error){
      addToast(error)
    }
  },[error])

  
  const [theme,setTheme] = useState(()=>{
    return sessionStorage.getItem("theme") || "light"
  })

  const changeThemeHandler = (theme) => {
    setTheme(theme)
  }

  useEffect(()=>{
    document.body.className = theme
    sessionStorage.setItem("theme",theme)
  },[theme])

  return (
    <>
    <Navbar onChangeTheme={changeThemeHandler}/>
    <div className='container'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/tts' element={<TTSPage />} />
        <Route path="/stt" element={<STTPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes> 
    </div>
    {error && (
        <ToastContainer className='position-fixed' style={{"bottom":10,"right":10}}>
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              bg="danger dark"
              onClose={() => {
                setToasts(prev => prev.filter(t => t.id !== toast.id))
              }}
              show={true}
            >
              <Toast.Header className='justify-content-between'>
                <strong>خطای سیستمی</strong>
              </Toast.Header>
              <Toast.Body className='text-white'>
                <div className='fs-6 fw-bold'>
                  {toast.message}
                </div>
                <small>کد خطا: 502</small>
              </Toast.Body>
            </Toast>
          ))}
        </ToastContainer>
      )}
      {isConnected && (
        <ToastContainer className='position-fixed' style={{"bottom":10,"right":10}}>
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              bg="success"
              onClose={() => {
                setToasts(prev => prev.filter(t => t.id !== toast.id))
              }}
              show={true}
            >
              <Toast.Header className='justify-content-between'>
                <strong>پیام موفقیت آمیز</strong>
              </Toast.Header>
              <Toast.Body className='text-white'>
                <div className='fs-6 fw-bold'>
                  به سرور وصل شد.
                </div>
                <small>کد : 200</small>
              </Toast.Body>
            </Toast>
          ))}
        </ToastContainer>
      )}
    
    <Footer />     
    </>
  )
}

export default App
