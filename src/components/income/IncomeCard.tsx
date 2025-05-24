import { Income } from "../../types"
import { formatCurrency, formatDate } from "../../utils/utils"
import IncomeDropdownMenu from "./IncomeDropdownMenu"

type IncomeCardProps = {
  income: Income
}

export default function IncomeCard({income} : IncomeCardProps) {
  return (
    <div className="bg-blue-600 p-3 rounded-xl flex justify-between
      md:p-5">
      <div className="space-y-1 max-w-[100px] flex-1">
        <h2 className="text-white font-bold uppercase text-sm md:text-xl">{income.title}</h2>
        <h3 className="text-white font-bold uppercase text-sm md:text-xl">{formatCurrency(+income.value)}</h3>
        <p className="text-gray-300 text-sm md:text-base">{formatDate(income.date)}</p>
      </div>
      <IncomeDropdownMenu id={income._id} />
    </div>
  )
}
