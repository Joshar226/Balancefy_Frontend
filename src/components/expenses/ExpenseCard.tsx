import { Expense } from "../../types"
import { formatCurrency, formatDate } from "../../utils/utils"
import ExpenseDropdownMenu from "./ExpenseDropdownMenu"


type ExpenseCardProps = {
  expense: Expense
}

export default function ExpenseCard({expense} : ExpenseCardProps) {
  return (
    <div className="bg-red-700 p-5 rounded-xl flex justify-between">
      <div className="space-y-1">
        <h2 className="text-white font-bold uppercase text-xl">{expense.title}</h2>
        <h3 className="text-white font-bold uppercase text-xl">{formatCurrency(+expense.value)}</h3>
        <p className="text-gray-300">{formatDate(expense.date)}</p>
      </div>
      <ExpenseDropdownMenu id={expense._id} />
    </div>
  )
}
