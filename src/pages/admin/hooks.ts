import { useQuery } from "react-query"
import { getLatestStore, getLatestusers } from "./apis"

export const useAdminPage = () => {
    const { data: usersData, isLoading: isUserLoading } = useQuery<any>({
        queryKey: ["latest-users"],
        queryFn: getLatestusers
    })
    const { data: storesData, isLoading: isStoreLoading } = useQuery<any>({
        queryKey: ["latest-stores"],
        queryFn: getLatestStore
    })

    return {
        isStoreLoading,
        isUserLoading,
        storesData,
        usersData
    }
}