import { useQuery } from "@tanstack/react-query"
import { getLiabilities } from "../../api/LiabilityAPI"
import { formatCurrency } from "../../utils/utils"
import Spinner from "../Spinner"
import { Link } from "react-router-dom"

export default function LiabilityDashboardCard() {
  const {data, isLoading} = useQuery({
    queryFn: getLiabilities,
    queryKey: ['liabilities']
  })

  if(isLoading) return <Spinner />

  const total = (data ?? []).reduce((total, item) => total + +item.value, 0)

  if(data)
  return (
    <Link to={'/liabilities'} className="bg-orange-600 text-center rounded-lg text-3xl text-white font-bold space-y-4 py-5 hover:bg-orange-700">
      <h2>Liabilities</h2>
      <h3>{formatCurrency(total)}</h3>
    </Link>
  )
}
