import { useForm } from "react-hook-form";
import { ExpenseForm } from "../../types";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "../../api/ExpenseAPI";
import { toast } from "react-toastify";

export default function CreateExpenseForm() {
  const queryClient = useQueryClient()

  const initialValues: ExpenseForm = {
    title: '',
    value: '',
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const {mutate} = useMutation({
    mutationFn: createExpense,
    onError: error => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['expenses']})
      toast.success(data)
      reset()
    }
  })

  const handleCreateExpense = (formData : ExpenseForm) => mutate(formData)

  return (
    <form
      onSubmit={handleSubmit(handleCreateExpense)}
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
        value="Create Income"
        className="col-span-2 text-white text-lg font-bold bg-red-900 py-2 rounded-xl cursor-pointer hover:bg-red-800"
      />
    </form>
  );
}
