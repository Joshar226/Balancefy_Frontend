import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { createAccount } from "../../api/AuthAPI"
import { toast } from "react-toastify"
import { AuthSingUpForm } from "../../types"
import ErrorMessage from "../../components/ErrorMessage"
import { Link } from "react-router-dom"

export default function SingUpView() {
    const initialValues : AuthSingUpForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    }

    const {handleSubmit, register, reset, watch, formState: {errors}} = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: createAccount,
        onError: error => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })

    const password = watch('password')
    const handleCreateAccount = (formData : AuthSingUpForm) => mutate(formData)

  return (
    <>
        <form
            onSubmit={handleSubmit(handleCreateAccount)}
            className="bg-white py-7 px-8 space-y-6 w-[380px]"
            noValidate
        >
            <div>
                <input 
                    type="text" 
                    placeholder="Your name"
                    className="border-2 border-[#18183d] py-2 px-5 text-lg font-medium logo-font w-full"
                    {...register('name', {
                        required: 'Your name is required'
                    })}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>

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
                value='Create Account'
                className="bg-blue-900 text-white text-xl font-bold logo-font py-2 w-full rounded-md cursor-pointer hover:bg-blue-950" 
            />

        </form>

        <Link 
            to={'/'}
            className="logo-font text-white text-xl hover:text-gray-400"
        >Log In</Link>

        <Link 
            to={'/auth/forgot-password'}
            className="logo-font text-white text-xl hover:text-gray-400"
        >Forgot Password?</Link>
    </>
  )
}
