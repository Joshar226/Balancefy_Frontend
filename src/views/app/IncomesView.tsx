import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getIncomes } from "../../api/IncomeAPI"
import { formatCurrency } from "../../utils/utils"
import CreateIncomeForm from "../../components/income/CreateIncomeForm"
import IncomeCard from "../../components/income/IncomeCard"
import { useLocation } from "react-router-dom"
import IncomeData from "../../components/income/IncomeData"
import Modal from "../../components/Modal"
import Spinner from "../../components/Spinner"
import { useStore } from "../../store"

export default function IncomesView() {
  const setSidebar = useStore((state) => state.setSidebar)
  setSidebar(false)
  
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
      <div className="flex flex-col xl:flex-row justify-around gap-4 mt-5
        md:gap-10 xl:mt-0"> 
        <div className="w-full md:h-[150px] bg-gradient-to-b from-[#0040ff] to-[#547cff] py-3 rounded-2xl space-y-2 flex flex-col justify-center items-center
          md:p-5 lg:items-start">
          <h2 className="text-white font-bold text-lg
            md:text-3xl">Total Incomes</h2>
          <p className="text-white font-bold text-lg
            md:text-3xl">{formatCurrency(total)}</p>
        </div>

        <div className="w-full md:h-[150px] bg-gradient-to-b from-[#0040ff] to-[#547cff] p-3 rounded-2xl space-y-2 flex flex-col justify-center
          md:p-5">
          <CreateIncomeForm />
        </div>
      </div>

      <div className=" grid grid-cols-2 gap-4 overflow-y-scroll max-h-[380px] mt-10
        md:max-h-[500px] lg:max-h-[600px] xl:grid-cols-3 2xl:grid-cols-4">
        {data.map( income => <IncomeCard key={income._id} income={income}/>)}
      </div>

      {location.search.includes('editIncome') && <Modal><IncomeData /></Modal>}
      {location.search.includes('deleteIncome') && <Modal><IncomeData /></Modal>}
    </>
  )
}
