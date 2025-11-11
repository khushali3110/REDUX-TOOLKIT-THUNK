import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"

import { Navigate, Outlet } from "react-router-dom"
import { auth } from "../../firebase"

const PrivateRoute = () => {
  const [authUser,setAuthUser] = useState({})

  useEffect(()=>{
      onAuthStateChanged(auth,(result)=> {
            // console.log(result)
            setAuthUser(result)
      })
  })
  return authUser != null ? <Outlet/> : <Navigate to ='/signin'/>
}


export default PrivateRoute