import { useQuery } from "@tanstack/react-query"
import { getIncomes } from "../../api/IncomeAPI"
import { formatCurrency } from "../../utils/utils"
import Spinner from "../Spinner"
import { Link } from "react-router-dom"

export default function IncomeDashboardCard() {

  const {data, isLoading} = useQuery({
    queryFn: getIncomes,
    queryKey: ['incomes']
  })

  if(isLoading) return <Spinner />

  const total = (data ?? []).reduce((total, item) => total + +item.value, 0)
  
  if(data)
  return (
    <Link to={'/incomes'} className="bg-blue-600 text-center flex flex-col justify-center rounded-lg text-xl text-white font-bold space-y-2 py-4 hover:bg-blue-700
      md:text-3xl md:py-5 md:space-y-4
    ">
      <h2>Incomes</h2>
      <h3>{formatCurrency(total)}</h3>
    </Link>
  )
}
