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
        <div className="flex flex-col xl:flex-row justify-around gap-4 mt-5
            md:gap-10 xl:mt-0">
            <div>
                <div className="w-full bg-gradient-to-b from-[#b80000] to-[#ff4242] py-3 rounded-2xl space-y-2 flex flex-col justify-center items-center
                    md:p-5 md:h-[150px] lg:items-start">
                    <h2 className="text-white font-bold text-lg
                        md:text-3xl">Total Expenses</h2>
                    <p className="text-white font-bold text-lg
                        md:text-3xl">{formatCurrency(total)}</p>
                </div>
            </div>

            <div>
                <div className="w-full bg-gradient-to-b from-[#b80000] to-[#ff4242] p-3 rounded-2xl space-y-2 flex flex-col justify-center
                    md:p-5 md:h-[150px]">
                    <CreateExpenseForm />
                </div>
            </div>
        </div>
    
        <div className="grid grid-cols-2 gap-4 overflow-y-scroll max-h-[380px] mt-10
            md:max-h-[500px] lg:max-h-[600px] xl:grid-cols-3 2xl:grid-cols-4">
            {data.map( expense => <ExpenseCard key={expense._id} expense={expense}/>)}
        </div>
    
        {location.search.includes('editExpense') && <Modal><ExpenseData /></Modal>}
        {location.search.includes('deleteExpense') && <Modal><ExpenseData /></Modal>}
    </>
  )
}
