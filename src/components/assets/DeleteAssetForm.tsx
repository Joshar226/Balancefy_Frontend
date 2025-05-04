import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Asset } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteAssetById } from "../../api/AssetAPI";
import { toast } from "react-toastify";

type DeleteAssetFormProps = {
  asset: Asset;
};

export default function DeleteAssetForm({ asset }: DeleteAssetFormProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteAssetById,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      navigate(location.pathname, { replace: true });
      toast.success(data);
    },
  });

  const handleDeleteAsset = () => mutate(asset._id);

  return (
    <div>
      <p className="text-center text-xl">
        Do you want to eliminate{" "}
        <span className="text-green-700 font-bold capitalize">
          {asset.title}
        </span>
        ?
      </p>
      <div className="flex w-full justify-evenly mt-5">
        <button
          className="bg-gray-300 py-1 px-5 rounded-md text-xl font-bold text-gray-600 cursor-pointer hover:bg-gray-400"
          onClick={() => navigate(location.pathname, { replace: true })}
        >
          Cancel
        </button>

        <button
          className="bg-red-600 py-1 px-5 rounded-md text-xl font-bold text-white cursor-pointer hover:bg-red-800"
          onClick={handleDeleteAsset}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
