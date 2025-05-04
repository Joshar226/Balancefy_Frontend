import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Income } from "../../types"
import { useLocation, useNavigate } from "react-router-dom"
import { deleteIncomebyId } from "../../api/IncomeAPI"
import { toast } from "react-toastify"

type DeleteIncomeFormProps = {
  income: Income
}

export default function DeleteIncomeForm({income} : DeleteIncomeFormProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: deleteIncomebyId,
    onError: error => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['incomes']})
      navigate(location.pathname, {replace: true})
      toast.success(data)
    }
  })

  const handleDeleteIncome = () => mutate(income._id)
  return (
    <div>
        <p className="text-center text-xl">Do you want to eliminate <span className="text-blue-700 font-bold capitalize">{income.title}</span>?</p>
        <div className="flex w-full justify-evenly mt-5">
            <button className="bg-gray-300 py-1 px-5 rounded-md text-xl font-bold text-gray-600 cursor-pointer hover:bg-gray-400"
              onClick={() => navigate(location.pathname, {replace: true})}
            >Cancel</button>

            <button className="bg-red-600 py-1 px-5 rounded-md text-xl font-bold text-white cursor-pointer hover:bg-red-800"
              onClick={handleDeleteIncome}
            >Delete</button>
        </div>
    </div>
  )
}
