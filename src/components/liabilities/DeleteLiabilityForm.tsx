import { useLocation, useNavigate } from "react-router-dom"
import { Liability } from "../../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteLiabilitybyId } from "../../api/LiabilityAPI"
import { toast } from "react-toastify"

type DeleteLiabilityFormProps = {
  liability: Liability
}

export default function DeleteLiabilityForm({liability} : DeleteLiabilityFormProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: deleteLiabilitybyId,
    onError: error => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['liabilities']})
      navigate(location.pathname, {replace: true})
      toast.success(data)
    }
  })

  const handleDeleteLiability = () => mutate(liability._id)

  return (
    <div>
      <p className="text-center text-xl">Do you want to eliminate <span className="text-orange-700 font-bold capitalize">{liability.title}</span>?</p>
      <div className="flex w-full justify-evenly mt-5">
          <button className="bg-gray-300 py-1 px-5 rounded-md text-xl font-bold text-gray-600 cursor-pointer hover:bg-gray-400"
            onClick={() => navigate(location.pathname, {replace: true})}
          >Cancel</button>

          <button className="bg-red-600 py-1 px-5 rounded-md text-xl font-bold text-white cursor-pointer hover:bg-red-800"
            onClick={handleDeleteLiability}
          >Delete</button>
      </div>
  </div>
  )
}
