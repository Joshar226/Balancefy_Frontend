import { useForm } from "react-hook-form"
import { LiabilityForm } from "../../types"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createLiability } from "../../api/LiabilityAPI"
import { toast } from "react-toastify"


export default function CreateLiabilityForm() {

    const queryClient = useQueryClient()

    const initialValues : LiabilityForm = {
        title: '',
        value: ''
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: createLiability,
        onError: error => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['liabilities']})
            toast.success(data)
            reset()
        }
    })
    
    const handleCreateLiability = (formData : LiabilityForm) => mutate(formData)

  return (
    <form
        onSubmit={handleSubmit(handleCreateLiability)}
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
            value='Create Liability'
            className='col-span-2 text-white text-lg font-bold bg-orange-700 py-2 rounded-xl cursor-pointer hover:bg-orange-800'
        />
    </form>
  )
}
