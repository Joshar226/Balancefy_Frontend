import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { UpdatePasswordType } from "../../types"
import { useMutation } from "@tanstack/react-query"
import { updatePassword } from "../../api/AuthAPI"
import { toast } from "react-toastify"
import { SlActionUndo } from "react-icons/sl";


type UpdatePasswordProps = {
    setProfileView: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UpdatePassword({setProfileView} : UpdatePasswordProps) {

    const initialValues : UpdatePasswordType = {
        current_password: '',
        password_confirmation: '',
        password: ''
    }
    
    const {handleSubmit, register, reset, watch, formState: {errors}} = useForm({defaultValues: initialValues})
    
    const {mutate} = useMutation({
        mutationFn: updatePassword,
        onError: error => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })

    const password = watch('password')
    const handleUpdatePassword = (formData : UpdatePasswordType) => mutate(formData)

  return (
    <div className="bg-[#18183d] rounded-2xl h-full w-[1000px] mx-auto py-20 px-10">


        <div onClick={() => setProfileView(false)} className="inline-flex items-center cursor-pointer px-5 py-2 rounded-md gap-3 mb-5 hover:bg-blue-950 ">
            <SlActionUndo color="white" size={20}/>
            <button onClick={() => setProfileView(false)} className="text-white text-xl font-bold cursor-pointer">Back</button>
        </div>


        <form 
            className="space-y-10"
            onSubmit={handleSubmit(handleUpdatePassword)}
        >
        <div>
            <label className="text-white text-xl font-bold block mb-2">Current Password</label>
            <input 
                type="password" 
                placeholder="Current Password"
                className="font-medium bg-slate-200 w-full py-2 px-5 rounded-md border-none capitalize"
                {...register('current_password', {
                    required: 'Your current password is required'
                })}
            />
            {errors.current_password && <ErrorMessage>{errors.current_password.message}</ErrorMessage>}
        </div>

        <div>
            <label className="text-white text-xl font-bold block mb-2">New Password</label>
            <input 
                type="password" 
                placeholder="New Password"
                className="font-medium bg-slate-200 w-full py-2 px-5 rounded-md border-none"
                {...register('password', {
                    required: 'A new password is required',
                    minLength: {
                        value: 8,
                        message: 'The password must be at least 8 characters long'
                    }
                })}
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <div>
            <label className="text-white text-xl font-bold block mb-2">Repeat New Password</label> 
            <input 
                type="password" 
                placeholder="Repeat new Password"
                className="font-medium bg-slate-200 w-full py-2 px-5 rounded-md border-none"
                {...register('password_confirmation', {
                    required: 'Repeat the new password is required',
                    validate: (value) => value === password || 'Passwords are not the same'
                })}
            />
            {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
        </div>

        <input 
            type="submit" 
            className="text-white text-2xl font-bold bg-blue-900 px-5 py-1 rounded-md cursor-pointer hover:bg-blue-950"
            value='Update Password'
        />
        </form>
    </div>
  )
}
