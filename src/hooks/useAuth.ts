import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/AuthAPI"

export const useAuth = () => {
    const {data, isError, isLoading} = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: false,
        refetchOnWindowFocus: false
    })
    return {data, isError, isLoading}
}