import { useState } from "react"
import ResetPasswordToken from "../../components/auth/ResetPasswordToken"
import ResetPasswordForm from "../../components/auth/ResetPasswordForm"

export default function ResetPasswordView() {
  const [token, setToken] = useState('')
  const [validated, setValidated] = useState(false)    

  return (
    <>
      {!validated ?
        <ResetPasswordToken token={token} setToken={setToken} setValidated={setValidated} />
      : 
        <ResetPasswordForm token={token}/> 
    }
    </>
  )
}
