'use client'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const ToastProvider = () => {
  return (
    <ToastContainer
      position='top-right'
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='dark'
      limit={1}
      closeOnClick
      toastStyle={{
        fontSize: '15px',
      }}
    />
  )
}

export default ToastProvider
