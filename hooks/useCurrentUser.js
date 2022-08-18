import { getAuth } from "firebase/auth"

export const useCurrentUser = () => {
    const { currentUser } = getAuth()
    if (currentUser) return currentUser
    return {}
}
