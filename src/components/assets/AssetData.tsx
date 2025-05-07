import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation } from "react-router-dom"
import { getAssetbyId } from "../../api/AssetAPI"
import Spinner from "../Spinner"
import EditAssetForm from "./EditAssetForm"
import DeleteAssetForm from "./DeleteAssetForm"
import { useAuth } from "../../hooks/useAuth"
import { useMemo } from "react"

export default function AssetData() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const assetId = queryParams.get('editAsset') || queryParams.get('deleteAsset')!

    const {data: user} = useAuth()

    const {data, isError, isLoading} = useQuery({
        queryFn: () => getAssetbyId(assetId),
        queryKey: ['asset'],
        enabled: !!assetId,
        retry: 1
    })

    const canEdit = useMemo(() => data?.owner === user?._id, [data, user])

    if(isError) return <Navigate to={'/404'}/>
    if(isLoading) return <Spinner />
    
    if(data && user)
  return (
    <>
        {location.search.includes('editAsset') && <EditAssetForm asset={data} canEdit={canEdit}/>}
        {location.search.includes('deleteAsset') && <DeleteAssetForm asset={data} canEdit={canEdit}/>}
    </>
  )
}
