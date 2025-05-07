import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation } from "react-router-dom"
import { getLiabilitybyId } from "../../api/LiabilityAPI"
import Spinner from "../Spinner"
import EditLiabilityForm from "./EditLiabilityForm"
import DeleteLiabilityForm from "./DeleteLiabilityForm"
import { useAuth } from "../../hooks/useAuth"
import { useMemo } from "react"

export default function LiabilityData() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const liabilityId = queryParams.get('editLiability') || queryParams.get('deleteLiability')!

    const {data: user} = useAuth()

    const {data, isError, isLoading} = useQuery({
        queryFn: () => getLiabilitybyId(liabilityId),
        queryKey: ['liability'],
        enabled: !!liabilityId,
        retry: 1
    })

    const canEdit = useMemo(() => data?.owner === user?._id, [data, user])

    if(isError) return <Navigate to={'/404'}/>
    if(isLoading) return <Spinner />

    if(data && user)
  return (
    <>
        {location.search.includes('editLiability') && <EditLiabilityForm liability={data} canEdit={canEdit}/>}
        {location.search.includes('deleteLiability') && <DeleteLiabilityForm liability={data} canEdit={canEdit}/>}
    </>
  )
}
