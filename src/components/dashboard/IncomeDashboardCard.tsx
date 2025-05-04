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
    <Link to={'/incomes'} className="bg-blue-600 text-center rounded-lg text-3xl text-white font-bold space-y-4 py-5 hover:bg-blue-700">
      <h2>Incomes</h2>
      <h3>{formatCurrency(total)}</h3>
    </Link>
  )
}
