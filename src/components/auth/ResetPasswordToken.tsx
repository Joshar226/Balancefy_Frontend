import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query"
import { validateToken } from "../../api/AuthAPI"
import { toast } from "react-toastify"
import { ConfirmAccount } from "../../types"

type ResetPasswordTokenProps = {
  token: string
  setValidated: React.Dispatch<React.SetStateAction<boolean>>
  setToken: React.Dispatch<React.SetStateAction<string>>
}

export default function ResetPasswordToken({token, setToken, setValidated} : ResetPasswordTokenProps) {   
    const {mutate} = useMutation({
        mutationFn: validateToken,
        onError: error => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            setValidated(true)
        }
    })

    const handleComplete = (token : ConfirmAccount['token']) => mutate({token})

  return (
    <div className="flex justify-center space-x-3">
        <PinInput value={token} onChange={(token) => setToken(token)} onComplete={handleComplete}>
            <PinInputField className="w-[50px] h-[50px] bg-white border-none text-center text-2xl font-medium rounded-xl placeholder:text-white"/>
            <PinInputField className="w-[50px] h-[50px] bg-white border-none text-center text-2xl font-medium rounded-xl placeholder:text-white"/>
            <PinInputField className="w-[50px] h-[50px] bg-white border-none text-center text-2xl font-medium rounded-xl placeholder:text-white"/>
            <PinInputField className="w-[50px] h-[50px] bg-white border-none text-center text-2xl font-medium rounded-xl placeholder:text-white"/>
            <PinInputField className="w-[50px] h-[50px] bg-white border-none text-center text-2xl font-medium rounded-xl placeholder:text-white"/>
            <PinInputField className="w-[50px] h-[50px] bg-white border-none text-center text-2xl font-medium rounded-xl placeholder:text-white"/>
        </PinInput>
    </div>
  )
}

