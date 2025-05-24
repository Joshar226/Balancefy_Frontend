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
        <div className="flex justify-around">
        <div>
            <div className="w-[745px] h-[150px] bg-gradient-to-b from-[#ff7b00] to-[#ffb01d] p-5 rounded-2xl space-y-2 flex flex-col justify-center">
            <h2 className="text-white font-bold text-3xl">Total Liabilities</h2>
            <p className="text-white font-bold text-3xl">{formatCurrency(total)}</p>
            </div>
        </div>
        <div>
            <div className="w-[745px] h-[150px] bg-gradient-to-b from-[#ff7b00] to-[#ffb01d] p-5 rounded-2xl space-y-2 flex flex-col justify-center">
                <CreateLiabilityForm />
            </div>
        </div>
        </div>

        <div className="py-16 grid grid-cols-4 gap-10">
        {data.map( liability => <LiabilityCard key={liability._id} liability={liability}/>)}
        </div>

        {location.search.includes('editLiability') && <Modal><LiabilityData /></Modal>}
        {location.search.includes('deleteLiability') && <Modal><LiabilityData /></Modal>}
    </>
  )
}
