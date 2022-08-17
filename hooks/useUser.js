import { useState, useEffect } from "react"
import { preAuthUser } from "../Firebase/client"

export const useUser = () => {
    const [user, setUser] = useState(undefined)
    useEffect(() => {
        preAuthUser(setUser)
    }, [])
    return { user, setUser }
}
