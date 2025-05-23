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
    <Link to={'/assets'} className="bg-green-700 text-center flex flex-col justify-center rounded-lg text-xl text-white font-bold space-y-2 py-4 hover:bg-green-800
      md:text-3xl md:py-5 md:space-y-4">
      <h2>Assets</h2>
      <h3>{formatCurrency(total)}</h3>
    </Link>
  )
}
