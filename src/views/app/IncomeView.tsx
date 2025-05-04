import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getIncomes } from "../../api/IncomeAPI"
import { formatCurrency } from "../../utils/utils"
import CreateIncomeForm from "../../components/income/CreateIncomeForm"
import IncomeCard from "../../components/income/IncomeCard"
import { useLocation } from "react-router-dom"
import IncomeData from "../../components/income/IncomeData"
import Modal from "../../components/Modal"
import Spinner from "../../components/Spinner"

export default function IncomeView() {
  const location = useLocation()
  const queryClient = useQueryClient()

  queryClient.removeQueries({queryKey: ['income']})
  const {data, isLoading} = useQuery({
    queryKey: ['incomes'],
    queryFn: getIncomes
  })

  if(isLoading) return <Spinner />

  const total = (data ?? []).reduce((total, item) => total + +item.value, 0)

  if(data)
  return (
    <>
      <div className="flex justify-around">
        <div>
          <div className="w-[745px] h-[150px] bg-gradient-to-b from-[#0040ff] to-[#547cff] p-5 rounded-2xl space-y-2 flex flex-col justify-center">
            <h2 className="text-white font-bold text-3xl">Total Incomes</h2>
            <p className="text-white font-bold text-3xl">{formatCurrency(total)}</p>
          </div>
        </div>
        <div>
          <div className="w-[745px] h-[150px] bg-gradient-to-b from-[#0040ff] to-[#547cff] p-5 rounded-2xl space-y-2 flex flex-col justify-center">
            <CreateIncomeForm />
          </div>
        </div>
      </div>

      <div className="py-16 grid grid-cols-4 gap-10">
        {data.map( income => <IncomeCard key={income._id} income={income}/>)}
      </div>

      {location.search.includes('editIncome') && <Modal><IncomeData /></Modal>}
      {location.search.includes('deleteIncome') && <Modal><IncomeData /></Modal>}
    </>
  )
}
