import { useForm } from "react-hook-form"
import ErrorMessage from "../../components/ErrorMessage"
import { AuthLogInForm } from "../../types"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { login } from "../../api/AuthAPI"
import { toast } from "react-toastify"

export default function LogInView() {

  const navigate = useNavigate()

  const initialValues : AuthLogInForm = {
    email: '',
    password: ''
  }

  const {handleSubmit, register, formState: {errors}} = useForm({defaultValues: initialValues})
  
  const {mutate} = useMutation({
    mutationFn: login,
    onError: error => toast.error(error.message),
    onSuccess: () => {
      navigate('/')
    }
  })

  const handleLogIn = (formData : AuthLogInForm) => mutate(formData)

  return (
    <>
        <form
          onSubmit={handleSubmit(handleLogIn)}
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



            <input 
              type="submit"
              value='Log In'
              className="bg-blue-900 text-white text-xl font-bold logo-font py-2 w-full rounded-md cursor-pointer hover:bg-blue-950" 
            />

        </form>

        <Link 
          to={'/auth/sing-up'}
          className="logo-font text-white text-xl hover:text-gray-400"
        >Sing Up</Link>

        <Link 
          to={'/auth/forgot-password'}
          className="logo-font text-white text-xl hover:text-gray-400"
        >Forgot Password?</Link>
    </>
  )
}
