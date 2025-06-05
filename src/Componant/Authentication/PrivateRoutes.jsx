import React, {useState , useEffect } from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoutes({children}) {
  const [unauthenticated, setunauthenticated] = useState(false)
  useEffect(() => {
    const checkAuth = () => {
      const userToken = JSON.parse(localStorage.getItem("Token"))
      // console.log(userToken)
      setunauthenticated(!userToken)
    }
    checkAuth()
  }, [])
  if(unauthenticated){
    return <Navigate to={"/login"} />
  }
  return children
}

export default PrivateRoutes