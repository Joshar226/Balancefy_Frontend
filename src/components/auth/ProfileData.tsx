import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import Spinner from "../Spinner"
import ProfileView from "../../views/auth/ProfileView"
import { useState } from "react"
import UpdatePassword from "./UpdatePassword"

export default function ProfileData() {
  const [profileView, setProfileView] = useState(false) 
    const {data: user, isLoading, isError} = useAuth()

    if(isError) return <Navigate to={'/404'}/>
    if(isLoading) return <Spinner />

    if(user)
  return (
    <>
      {!profileView ? <ProfileView user={user} setProfileView={setProfileView}/> : <UpdatePassword setProfileView={setProfileView}/>} 
    </>
  )
}
