import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../../api/ExpenseAPI";
import { formatCurrency } from "../../utils/utils";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";


export default function ExpenseDashboardCard() {
  const {data, isLoading} = useQuery({
    queryFn: getExpenses,
    queryKey: ['expenses']
  })

  if(isLoading) return <Spinner />

  const total = (data ?? []).reduce((total, item) => total + +item.value, 0)
  
  if(data)
  return (
    <Link to={'/expenses'} className="bg-red-700 text-center rounded-lg text-3xl text-white font-bold space-y-4 py-5 hover:bg-red-800">
      <h2>Expenses</h2>
      <h3>{formatCurrency(total)}</h3>
    </Link>
  )
}
