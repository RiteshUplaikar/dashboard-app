import { useQuery } from "react-query"
import { getUsers } from "./apis"

export const useUserTable = () => {
    const { isLoading, data } = useQuery<any>({
        queryKey: ["User-table"],
        queryFn: getUsers
    })
    return { data, isLoading }
}