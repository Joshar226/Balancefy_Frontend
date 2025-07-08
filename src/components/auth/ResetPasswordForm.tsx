import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { ResetPasswordType } from "../../types"
import { useMutation } from "@tanstack/react-query"
import { resetPassword } from "../../api/AuthAPI"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

type ResetPasswordFormProps = {
  token: string
}

export default function ResetPasswordForm({token} : ResetPasswordFormProps) {
  const navigate = useNavigate()

  const initialValues : ResetPasswordType = {
    password: '',
    password_confirmation: ''
  }

  const {handleSubmit, register, reset, watch, formState: {errors}} = useForm({defaultValues: initialValues})

  const {mutate} = useMutation({
    mutationFn: resetPassword,
    onError: error => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
      reset()
      setTimeout(() => {
        navigate('/')
      }, 3000);
    }
  })

  const password = watch('password')
  const handleResetPassword = (formData : ResetPasswordType) => {
    const data = {
      password: formData.password,
      password_confirmation: formData.password_confirmation,
      token
    }    
    mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleResetPassword)}
      className="bg-white py-7 px-8 space-y-6 w-[380px]"
      noValidate
    >
      <div>
          <input 
              type="password" 
              placeholder="Password"
              className="border-2 border-[#18183d] py-2 px-5 text-lg font-medium logo-font w-full"
              {...register('password', {
                  required: 'A password is required',
                  minLength: {
                      value: 8,
                      message: 'The password must be at least 8 characters long'
                  }
              })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
      </div>

      <div>
          <input 
              type="password" 
              placeholder="Password Confirmation"
              className="border-2 border-[#18183d] py-2 px-5 text-lg font-medium logo-font w-full"
              {...register('password_confirmation', {
                  required: "The password doesn't match",
                  validate: (value) => value === password || 'Passwords are not the same'
              })}
          />
          {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
      </div>

      <input 
          type="submit"
          value='Reset Password'
          className="bg-blue-900 text-white text-xl font-bold logo-font py-2 w-full rounded-md cursor-pointer hover:bg-blue-950" 
      />
    </form>
  )
}
