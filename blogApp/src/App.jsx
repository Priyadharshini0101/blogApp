import { useState, useEffect } from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { addUser } from './store/authSlice'
import { useSnackbar } from 'react-simple-snackbar'

function App() {
  
  const [openSnackbar, closeSnackbar] = useSnackbar()  
  const navigate = useNavigate()
  const [header,setHeader] = useState()
  const dispatch = useDispatch()

  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      if(user){
        console.log("Logged In",location.pathname)
        navigate('/')
        setHeader(true)
        openSnackbar("Logged in")
        dispatch(addUser(user))

      }else{
        console.log("Logged Out")
        navigate('/login')
        setHeader(false)
        openSnackbar("Logged Out")
      }
    })
  },[])

    return  ( 
    <div className="min-h-screen flex flex-wrap">
          <div className="w-full block">
      { header ?    <Header /> : ""}
              <Outlet />
      {header ?       <Footer /> : ""}
          </div>
      </div>
  )
}

export default App