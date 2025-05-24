import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatCurrency } from "../../utils/utils";
import { getLiabilities } from "../../api/LiabilityAPI";
import Spinner from "../../components/Spinner";
import CreateLiabilityForm from "../../components/liabilities/CreateLiabilityForm";
import LiabilityCard from "../../components/liabilities/LiabilityCard";
import { useLocation } from "react-router-dom";
import Modal from "../../components/Modal";
import LiabilityData from "../../components/liabilities/LiabilityData";
import { useStore } from "../../store";


export default function LiabilitiesView() {
    const setSidebar = useStore((state) => state.setSidebar)
    setSidebar(false)

    const location = useLocation()
    const queryClient = useQueryClient()

    queryClient.removeQueries({queryKey: ['liability']})
    const {data, isLoading} = useQuery({
        queryKey: ['liabilities'],
        queryFn: getLiabilities
    }) 

    if(isLoading) return <Spinner />

    const total = (data ?? []).reduce((total, item) => total + +item.value, 0)

    if(data)
  return (
    <>
        <div className="flex flex-col xl:flex-row justify-around gap-4 mt-5
            md:gap-10 xl:mt-0">
        <div>
            <div className="w-full bg-gradient-to-b from-[#ff7b00] to-[#ffb01d] py-3 rounded-2xl space-y-2 flex flex-col justify-center items-center
                md:p-5 md:h-[150px] lg:items-start">
            <h2 className="text-white font-bold text-lg
                md:text-3xl">Total Liabilities</h2>
            <p className="text-white font-bold text-lg
                md:text-3xl">{formatCurrency(total)}</p>
            </div>
        </div>
        <div>
            <div className="w-full bg-gradient-to-b from-[#ff7b00] to-[#ffb01d] p-3 rounded-2xl space-y-2 flex flex-col justify-center
                md:p-5 md:h-[150px]">
                <CreateLiabilityForm />
            </div>
        </div>
        </div>

        <div className="grid grid-cols-2 gap-4 overflow-y-scroll max-h-[380px] mt-10
            md:max-h-[500px] lg:max-h-[600px] xl:grid-cols-3 2xl:grid-cols-4">
        {data.map( liability => <LiabilityCard key={liability._id} liability={liability}/>)}
        </div>

        {location.search.includes('editLiability') && <Modal><LiabilityData /></Modal>}
        {location.search.includes('deleteLiability') && <Modal><LiabilityData /></Modal>}
    </>
  )
}
