import { useForm } from "react-hook-form"
import { Asset, AssetForm } from "../../types"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateAssetById } from "../../api/AssetAPI"
import { toast } from "react-toastify"
import { useLocation, useNavigate } from "react-router-dom"

type EditAssetFormProps = {
    asset: Asset
}

export default function EditAssetForm({asset} : EditAssetFormProps) {
    const location = useLocation();
    const navigate = useNavigate();
  
    const queryClient = useQueryClient();
    
    const initialValues : AssetForm = {
        title: asset.title,
        value: asset.value
    }

    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: updateAssetById,
        onError: error => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['assets']})
            toast.success(data)
            navigate(location.pathname, {replace: true})
        }
    })

    const handleEditAsset = (formData : AssetForm) => {
        const data = {
            formData,
            assetId : asset._id
        }
        mutate(data)
    }

  return (
    <form
        onSubmit={handleSubmit(handleEditAsset)}
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
        value="Edit Asset"
        className="col-span-2 text-white text-lg font-bold bg-green-800 py-2 rounded-xl cursor-pointer hover:bg-green-900"
        />
    </form>
  )
}
