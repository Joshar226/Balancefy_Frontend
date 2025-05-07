import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Expense } from "../../types"
import { useLocation, useNavigate } from "react-router-dom"
import { deleteExpenseById } from "../../api/ExpenseAPI"
import { toast } from "react-toastify"
import { useEffect } from "react"

type DeleteExpenseFormProps = {
  expense: Expense
  canEdit: boolean
}

export default function DeleteExpenseForm({expense, canEdit} : DeleteExpenseFormProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
    useEffect(() => {
      if(!canEdit) {
        navigate('/404')
      }
    }, [canEdit, navigate])

  const {mutate} = useMutation({
    mutationFn: deleteExpenseById,
    onError: error => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['expenses']})
      navigate(location.pathname, {replace: true})
      toast.success(data)
    }
  })

  const handleDeleteExpense = () => mutate(expense._id)

  return (
    <div>
        <p className="text-center text-xl">Do you want to eliminate <span className="text-red-700 font-bold capitalize">{expense.title}</span>?</p>
        <div className="flex w-full justify-evenly mt-5">
            <button className="bg-gray-300 py-1 px-5 rounded-md text-xl font-bold text-gray-600 cursor-pointer hover:bg-gray-400"
              onClick={() => navigate(location.pathname, {replace: true})}
            >Cancel</button>

            <button className="bg-red-600 py-1 px-5 rounded-md text-xl font-bold text-white cursor-pointer hover:bg-red-800"
              onClick={handleDeleteExpense}
            >Delete</button>
        </div>
    </div>
  )
}
