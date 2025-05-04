import { useMutation } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router-dom"
import { confirmAccount } from "../../api/AuthAPI"
import { toast } from "react-toastify"
import { ConfirmAccount } from "../../types"

export default function ConfirmAccountForm() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get('token')!
    const navigate = useNavigate()

    const {mutate} = useMutation({
      mutationFn: confirmAccount,
      onError: error => toast.error(error.message),
      onSuccess: (data) => {
        toast.success(data)
      }
    })    

    const handleConfirmAccount = (token: ConfirmAccount) => mutate(token)

    handleConfirmAccount

  return (
    <div>ConfirmAccount</div>
  )
}
