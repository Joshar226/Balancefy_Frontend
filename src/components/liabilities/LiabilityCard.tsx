import { Liability } from "../../types"
import { formatCurrency } from "../../utils/utils"
import LiabilityDropdownMenu from "./LiabilityDropdownMenu"

type LiabilityCardProps = {
  liability: Liability
}

export default function LiabilityCard({liability} : LiabilityCardProps) {

  return (
    <div className="bg-orange-600 p-5 rounded-xl flex justify-between">
      <div className="space-y-1">
      <h2 className="text-white font-bold uppercase text-xl">{liability.title}</h2>
      <h3 className="text-white font-bold uppercase text-xl">{formatCurrency(+liability.value)}</h3>
      </div>
      <LiabilityDropdownMenu id={liability._id} />
    </div>
  )
}
