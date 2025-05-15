import { useQuery } from "react-query"
import { getStores } from "./apis"

export const useStoreTable = () => {
    const { isLoading, data } = useQuery<any>({
        queryKey: ["store-table"],
        queryFn: getStores
    })
    return { data, isLoading }
}