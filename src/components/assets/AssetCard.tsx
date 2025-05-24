import { Asset } from "../../types"
import { formatCurrency } from "../../utils/utils"
import AssetDropdownMenu from "./AssetDropdownMenu"

type AssetCardProps = {
  asset: Asset
}

export default function AssetCard({asset} : AssetCardProps) {
    
  return (
    <div className="bg-green-700 p-3 rounded-xl flex justify-between
      md:p-5">
        <div className="space-y-1 max-w-[100px] flex-1">
        <h2 className="text-white font-bold uppercase text-sm md:text-xl">{asset.title}</h2>
        <h3 className="text-white font-bold uppercase text-sm md:text-xl">{formatCurrency(+asset.value)}</h3>
        </div>
        <AssetDropdownMenu id={asset._id} />
    </div>
  )
}
