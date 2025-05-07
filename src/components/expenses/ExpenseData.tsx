import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation } from "react-router-dom"
import { getExpensebyId } from "../../api/ExpenseAPI"
import Spinner from "../Spinner"
import EditExpenseForm from "./EditExpenseForm"
import DeleteExpenseForm from "./DeleteExpenseForm"
import { useAuth } from "../../hooks/useAuth"
import { useMemo } from "react"

export default function ExpenseData() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const expenseId = queryParams.get('editExpense') || queryParams.get('deleteExpense')!

  const {data: user} = useAuth()

  const {data, isError, isLoading} = useQuery({
    queryFn: () => getExpensebyId(expenseId),
    queryKey: ['expense'],
    enabled: !!expenseId,
    retry: 1
  })

  const canEdit = useMemo(() => data?.owner === user?._id, [data, user])

  if(isError) return <Navigate to={'/404'}/>
  if(isLoading) return <Spinner />
  
  if(data && user)
  return (
    <>
      {location.search.includes('editExpense') && <EditExpenseForm expense={data} canEdit={canEdit}/>}
      {location.search.includes('deleteExpense') && <DeleteExpenseForm expense={data} canEdit={canEdit}/>}
    </>
  )
}
