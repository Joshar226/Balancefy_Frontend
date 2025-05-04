import { useForm } from "react-hook-form"
import { Income, IncomeForm } from "../../types"
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIncomeById } from "../../api/IncomeAPI";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

type EditIncomeFormProps = {
    income: Income
}

export default function EditIncomeForm({income} : EditIncomeFormProps) {
    const location = useLocation()
    const navigate = useNavigate()
    
    const queryClient = useQueryClient()
    

    const initialValues : IncomeForm = {
        title: income.title,
        value: income.value
    }

    const {handleSubmit ,register, formState: {errors}} = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: updateIncomeById,
        onError: error => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['incomes']})
            toast.success(data)
            navigate(location.pathname, {replace: true})
        }
    })

    const handleEditIncome = (formData : IncomeForm) => {
        const data = {
            formData,
            incomeId: income._id
        }
        mutate(data)
    }

  return (
    <form
        onSubmit={handleSubmit(handleEditIncome)}
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
            className='col-span-2 text-white text-lg font-bold bg-blue-800 py-2 rounded-xl cursor-pointer hover:bg-blue-900'
        />
    </form>
  )
}
