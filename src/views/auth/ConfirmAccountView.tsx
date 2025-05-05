import { useMutation } from "@tanstack/react-query"
import { confirmAccount } from "../../api/AuthAPI"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function ConfirmAccountView() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get('token')!
  const [confirmed, setConfirmed] = useState(false)
  const navigate = useNavigate()

  const {mutate} = useMutation({
    mutationFn: confirmAccount,
    onSuccess: () => {
      setConfirmed(true)
      setTimeout(() => {
        navigate('/auth/log-in')
      }, 3000);
    }
  })

  useEffect(() => {
    if(token)
    mutate({token})
  }, [token])
  
  if(confirmed)
  return (
    <div className="text-white font-bold space-y-3 mt-5 text-center">
      <h2 className="text-4xl">Account Confirmed</h2>
      <h3 className="text-2xl">Redirecting...</h3>
    </div>
  )
}
