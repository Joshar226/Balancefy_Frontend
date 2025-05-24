import { useQuery, useQueryClient } from "@tanstack/react-query";
import CreateExpenseForm from "../../components/expenses/CreateExpenseForm";
import ExpenseCard from "../../components/expenses/ExpenseCard";
import ExpenseData from "../../components/expenses/ExpenseData";
import Modal from "../../components/Modal";
import { getExpenses } from "../../api/ExpenseAPI";
import Spinner from "../../components/Spinner";
import { formatCurrency } from "../../utils/utils";
import { useLocation } from "react-router-dom";
import { useStore } from "../../store";

export default function ExpensesView() {
    const setSidebar = useStore((state) => state.setSidebar)
    setSidebar(false)
    
    const location = useLocation()
    const queryClient = useQueryClient()
    
    queryClient.removeQueries({queryKey: ['expense']})
    const {data, isLoading} = useQuery({
        queryKey: ['expenses'],
        queryFn: getExpenses
    })

    if(isLoading) return <Spinner />

    const total = (data ?? []).reduce((total, item) => total + +item.value, 0)

    if(data)
  return (
    <>
        <div className="flex justify-around">
            <div>
                <div className="w-[745px] h-[150px] bg-gradient-to-b from-[#b80000] to-[#ff4242] p-5 rounded-2xl space-y-2 flex flex-col justify-center">
                    <h2 className="text-white font-bold text-3xl">Total Expenses</h2>
                    <p className="text-white font-bold text-3xl">{formatCurrency(total)}</p>
                </div>
            </div>

            <div>
                <div className="w-[745px] h-[150px] bg-gradient-to-b from-[#b80000] to-[#ff4242] p-5 rounded-2xl space-y-2 flex flex-col justify-center">
                    <CreateExpenseForm />
                </div>
            </div>
        </div>
    
        <div className="py-16 grid grid-cols-4 gap-10">
            {data.map( expense => <ExpenseCard key={expense._id} expense={expense}/>)}
        </div>
    
        {location.search.includes('editExpense') && <Modal><ExpenseData /></Modal>}
        {location.search.includes('deleteExpense') && <Modal><ExpenseData /></Modal>}
    </>
  )
}
