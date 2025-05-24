import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useLocation } from "react-router-dom"
import Spinner from "../../components/Spinner"
import { formatCurrency } from "../../utils/utils"
import { getAssets } from "../../api/AssetAPI"
import CreateAssetForm from "../../components/assets/CreateAssetForm"
import AssetCard from "../../components/assets/AssetCard"
import Modal from "../../components/Modal"
import AssetData from "../../components/assets/AssetData"
import { useStore } from "../../store"


export default function AssetsView() {
    const setSidebar = useStore((state) => state.setSidebar)
    setSidebar(false)
    
    const location = useLocation()
    const queryClient = useQueryClient()
    
    queryClient.removeQueries({queryKey: ['asset']})
    const {data, isLoading} = useQuery({
        queryKey: ['assets'],
        queryFn: getAssets
    })

    if(isLoading) return <Spinner />

    const total = (data ?? []).reduce((total, item) => total + +item.value, 0)

    if(data)
  return (
    <>
        <div className="flex justify-around">
            <div>
                <div className="w-[745px] h-[150px] bg-gradient-to-b from-[#048100] to-[#39fa28] p-5 rounded-2xl space-y-2 flex flex-col justify-center">
                    <h2 className="text-white font-bold text-3xl">Total Assets</h2>
                    <p className="text-white font-bold text-3xl">{formatCurrency(total)}</p>
                </div>
            </div>

            <div>
                <div className="w-[745px] h-[150px] bg-gradient-to-b from-[#048100] to-[#39fa28] p-5 rounded-2xl space-y-2 flex flex-col justify-center">
                    <CreateAssetForm />
                </div>
            </div>
        </div>
    
        <div className="py-16 grid grid-cols-4 gap-10">
            {data.map( asset => <AssetCard key={asset._id} asset={asset}/>)}
        </div>
    
        {location.search.includes('editAsset') && <Modal><AssetData /></Modal>}
        {location.search.includes('deleteAsset') && <Modal><AssetData /></Modal>}
    </>
  )
}
