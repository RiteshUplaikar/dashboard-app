import { useMutation } from "react-query"
import { createUser } from "./apis"

export const useRegisterUser = () => {
    const { isLoading, mutate: requestToCreateUser } = useMutation((values: any) => createUser(values), {
        onSuccess: (response) => {
            console.log(response)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const handleCreateUser = (values: any) => {
        requestToCreateUser(values)
    }

    return {
        isLoading,
        handleCreateUser
    }
}