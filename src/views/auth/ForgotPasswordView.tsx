import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../api/AuthAPI";
import { toast } from "react-toastify";
import { ForgotPassword } from "../../types";

export default function ForgotPasswordView() {

    const initialValues = {
        email: ''
    }

    const {handleSubmit, register, formState: {errors}} = useForm({defaultValues : initialValues})

    const {mutate} = useMutation({
      mutationFn: forgotPassword,
      onError: error => toast.error(error.message),
      onSuccess: (data) => {
        toast.success(data)
      }
    })

    const handleForgotPassword = (email: ForgotPassword) => mutate(email)
  return (
    <>
        <form
          onSubmit={handleSubmit(handleForgotPassword)}
          className="bg-white py-7 px-8 space-y-6 w-[380px]"
          noValidate
        >
          <div>
            <input 
              type="email" 
              placeholder="E-mail"
              className="border-2 border-[#18183d] py-2 px-5 text-lg font-medium logo-font w-full"
              {...register('email', {
                required: 'An email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email",
                }
              })}
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </div>
              
            <input 
              type="submit"
              value='Send Email'
              className="bg-blue-900 text-white text-xl font-bold logo-font py-2 w-full rounded-md cursor-pointer hover:bg-blue-950" 
            />

        </form>
        
        <Link 
          to={'/'}
          className="logo-font text-white text-xl hover:text-gray-400"
        >log In</Link>

        <Link 
          to={'/auth/sing-up'}
          className="logo-font text-white text-xl hover:text-gray-400"
        >Sing Up</Link>
    </>
  )
}
