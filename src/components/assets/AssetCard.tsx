import { Asset } from "../../types"
import { formatCurrency } from "../../utils/utils"
import AssetDropdownMenu from "./AssetDropdownMenu"

type AssetCardProps = {
  asset: Asset
}

export default function AssetCard({asset} : AssetCardProps) {
    
  return (
    <div className="bg-green-700 p-5 rounded-xl flex justify-between">
        <div className="space-y-1">
        <h2 className="text-white font-bold uppercase text-xl">{asset.title}</h2>
        <h3 className="text-white font-bold uppercase text-xl">{formatCurrency(+asset.value)}</h3>
        </div>
        <AssetDropdownMenu id={asset._id} />
    </div>
  )
}
