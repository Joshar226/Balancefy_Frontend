import { Income } from "../../types"
import { formatCurrency, formatDate } from "../../utils/utils"
import IncomeDropdownMenu from "./IncomeDropdownMenu"

type IncomeCardProps = {
  income: Income
}

export default function IncomeCard({income} : IncomeCardProps) {

  return (
    <div className="bg-blue-600 p-5 rounded-xl flex justify-between">
      <div className="space-y-1">
        <h2 className="text-white font-bold uppercase text-xl">{income.title}</h2>
        <h3 className="text-white font-bold uppercase text-xl">{formatCurrency(+income.value)}</h3>
        <p className="text-gray-300">{formatDate(income.date)}</p>
      </div>
      <IncomeDropdownMenu id={income._id} />
    </div>
  )
}
