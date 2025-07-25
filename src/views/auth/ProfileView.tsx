import { useForm } from "react-hook-form"
import ErrorMessage from "../../components/ErrorMessage"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "../../api/AuthAPI"
import { toast } from "react-toastify"
import { ProfileForm, User } from "../../types"
import { useStore } from "../../store"

type ProfileViewProps = {
  user: User
  setProfileView: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProfileView({user, setProfileView} : ProfileViewProps) {
  const setSidebar = useStore((state) => state.setSidebar)
  setSidebar(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const initialValues : ProfileForm = {
    name: user.name,
    email: user.email
  }

  const {handleSubmit, register, formState: {errors}} = useForm({defaultValues: initialValues})
  
  const {mutate} = useMutation({
    mutationFn: updateProfile,
    onError: error => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['user']})
      toast.success(data)
    }
  })

  const handleEditProfile = (formData : ProfileForm) => mutate(formData)
  
  const handleLogOut = () => {
    localStorage.removeItem('AUTH_TOKEN')
    setTimeout(() => {
      navigate('/')
    }, 100);
  }

  return (
    <div className="bg-[#18183d] rounded-2xl h-full w-full mx-auto py-10 px-7 mt-5
      lg:py-20 lg:px-10 lg:mt-0">
      <form 
        className="space-y-10"
        onSubmit={handleSubmit(handleEditProfile)}
      >
        <div>
          <label className="text-white text-xl font-bold block mb-2">Name</label>
            <input 
                type="text" 
                placeholder="Name"
                className="font-medium bg-slate-200 w-full py-2 px-5 rounded-md border-none capitalize"
                {...register('name', {
                  required: 'Your name is required'
                })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div>
          <label className="text-white text-xl font-bold block mb-2">Email</label>
            <input 
              type="email" 
              placeholder="E-mail"
              className="font-medium bg-slate-200 w-full py-2 px-5 rounded-md border-none"
              {...register('email', {
                required: 'Your email is required'
              })}
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input 
          type="submit" 
          className="text-white text-xl font-bold bg-blue-900 px-5 py-1 rounded-md cursor-pointer hover:bg-blue-950 w-full
            md:text-2xl lg:w-auto"
          value='Save'
        />
      </form>

      <div className="text-xl font-bold text-white mt-20">
        <button onClick={() => setProfileView(true)} className="rounded-md hover:bg-blue-950 px-4 py-2 hover:cursor-pointer w-full
          lg:w-auto">Change Password</button>
        <button 
          className="bg-red-600 px-4 py-2 rounded-md cursor-pointer hover:bg-red-700 block mt-7 w-full text-xl
            lg:w-auto md:text-2xl"
          onClick={handleLogOut}
        >Sing Out</button>
      </div>
    </div>
  )
}
