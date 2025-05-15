import { useMutation } from "react-query"
import { createStore } from "./apis"

export const useRegisterStoreForm = () => {
    const { isLoading, mutate: requestToCreateStore } = useMutation((values: any) => createStore(values), {
        onSuccess: (response) => {
            console.log(response)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const handleCreateStore = (values: any) => {
        const payload = {
            ...values,
            role: "store"
        }
        requestToCreateStore(payload)
    }

    return {
        isLoading,
        handleCreateStore
    }
}