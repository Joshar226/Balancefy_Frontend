import { useForm } from "react-hook-form";
import { Expense, ExpenseForm } from "../../types";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExpenseById } from "../../api/ExpenseAPI";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

type EditExpenseFormProps = {
  expense: Expense;
};

export default function EditExpenseForm({ expense }: EditExpenseFormProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const initialValues: ExpenseForm = {
    title: expense.title,
    value: expense.value,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: updateExpenseById,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success(data);
      navigate(location.pathname, { replace: true });
    },
  });

  const handleEditExpense = (formData: ExpenseForm) => {
    const data = {
      formData,
      expenseId: expense._id,
    };
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleEditExpense)}
      className="grid grid-cols-2 gap-3"
    >
      <div>
        <input
          type="text"
          placeholder="Title"
          className="font-medium bg-slate-200 w-full py-2 px-5 rounded-md border-none capitalize"
          {...register("title", {
            required: "A title is required",
          })}
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </div>

      <div>
        <input
          type="number"
          placeholder="Value"
          className="font-medium bg-slate-200 w-full py-2 px-5 rounded-md border-none"
          {...register("value", {
            required: "A value is required",
          })}
        />
        {errors.value && <ErrorMessage>{errors.value.message}</ErrorMessage>}
      </div>

      <input
        type="submit"
        value="Edit Expense"
        className="col-span-2 text-white text-lg font-bold bg-red-800 py-2 rounded-xl cursor-pointer hover:bg-red-900"
      />
    </form>
  );
}
