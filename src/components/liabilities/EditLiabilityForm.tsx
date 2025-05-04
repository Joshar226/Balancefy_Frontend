import { useLocation, useNavigate } from "react-router-dom"
import { Liability, LiabilityForm } from "../../types"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateLiabilityById } from "../../api/LiabilityAPI"
import { toast } from "react-toastify"

type EditLiabilityFormProps = {
    liability: Liability
}

export default function EditLiabilityForm({liability} : EditLiabilityFormProps) {  
  const location = useLocation()
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  
  const initialValues : LiabilityForm = {
    title: liability.title,
    value: liability.value
  }

  const {handleSubmit ,register, formState: {errors}} = useForm({defaultValues: initialValues})
  
  const {mutate} = useMutation({
    mutationFn: updateLiabilityById,
    onError: error => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['liabilities']})
      toast.success(data)
      navigate(location.pathname, {replace: true})
    }
  })

  const handleEditLiability = (formData : LiabilityForm) => {
    const data = {
      formData,
      liabilityId : liability._id
    }

    mutate(data)
  }

  return (
    <form
        onSubmit={handleSubmit(handleEditLiability)}
        className='grid grid-cols-2 gap-3'
    >
        <div>
            <input 
                type="text" 
                placeholder="Title"
                className="font-medium bg-slate-200 w-full py-2 px-5 rounded-md border-none capitalize"
                {...register('title', {
                    required: 'A title is required'
                })}
            />
            {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </div>

        <div>
            <input 
                type="number" 
                placeholder="Value"
                className="font-medium bg-slate-200 w-full py-2 px-5 rounded-md border-none"
                {...register('value', {
                    required: 'A value is required'
                })}
            />
            {errors.value && <ErrorMessage>{errors.value.message}</ErrorMessage>}
        </div>

        <input 
            type="submit"
            value='Edit Income'
            className='col-span-2 text-white text-lg font-bold bg-orange-700 py-2 rounded-xl cursor-pointer hover:bg-orange-800'
        />
    </form>
  )
}
