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
        <div className="flex flex-col xl:flex-row justify-around gap-4 mt-5
            md:gap-10 xl:mt-0">
            <div>
                <div className="w-full bg-gradient-to-b from-[#048100] to-[#39fa28] py-3 rounded-2xl space-y-2 flex flex-col justify-center items-center
                    md:p-5 md:h-[150px] lg:items-start">
                    <h2 className="text-white font-bold text-lg
                        md:text-3xl">Total Assets</h2>
                    <p className="text-white font-bold text-lg
                        md:text-3xl">{formatCurrency(total)}</p>
                </div>
            </div>

            <div>
                <div className="w-full bg-gradient-to-b from-[#048100] to-[#39fa28] p-3 rounded-2xl space-y-2 flex flex-col justify-center
                    md:p-5 md:h-[150px]">
                    <CreateAssetForm />
                </div>
            </div>
        </div>
    
        <div className="grid grid-cols-2 gap-4 overflow-y-scroll max-h-[380px] mt-10
            md:max-h-[500px] lg:max-h-[600px] xl:grid-cols-3 2xl:grid-cols-4">
            {data.map( asset => <AssetCard key={asset._id} asset={asset}/>)}
        </div>
    
        {location.search.includes('editAsset') && <Modal><AssetData /></Modal>}
        {location.search.includes('deleteAsset') && <Modal><AssetData /></Modal>}
    </>
  )
}
