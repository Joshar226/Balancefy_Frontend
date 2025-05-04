import { useQuery } from "@tanstack/react-query"
import { getIncomebyId } from "../../api/IncomeAPI"
import { Navigate, useLocation } from "react-router-dom"
import EditIncomeForm from "./EditIncomeForm"
import Spinner from "../Spinner"
import DeleteIncomeForm from "./DeleteIncomeForm"

export default function IncomeData() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const incomeId = queryParams.get('editIncome') || queryParams.get('deleteIncome')!

  const {data, isError, isLoading} = useQuery({
    queryFn: () => getIncomebyId(incomeId),
    queryKey: ['income'],
    enabled: !!incomeId,
    retry: 1
  })

  if(isError) return <Navigate to={'/404'}/>
  if(isLoading) return <Spinner />
  
  if(data)
  return (
    <>
      {location.search.includes('editIncome') && <EditIncomeForm income={data} />}
      {location.search.includes('deleteIncome') && <DeleteIncomeForm income={data} />}
    </>
  )
}


