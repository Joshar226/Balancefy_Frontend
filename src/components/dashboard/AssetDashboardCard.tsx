import { useQuery } from "@tanstack/react-query"
import { getAssets } from "../../api/AssetAPI"
import { formatCurrency } from "../../utils/utils"
import Spinner from "../Spinner"
import { Link } from "react-router-dom"

export default function AssetDashboardCard() {
  const {data, isLoading} = useQuery({
    queryFn: getAssets,
    queryKey: ['assets']
  })

  if(isLoading) return <Spinner />

  const total = (data ?? []).reduce((total, item) => total + +item.value, 0)

  if(data)
  return (
    <Link to={'/assets'} className="bg-green-700 text-center rounded-lg text-3xl text-white font-bold space-y-4 py-5 hover:bg-green-800">
      <h2>Assets</h2>
      <h3>{formatCurrency(total)}</h3>
    </Link>
  )
}
