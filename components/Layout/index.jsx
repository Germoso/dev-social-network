import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/router"
import { Navbar } from "components/Navbar"
import { Sort } from "components/Navbar/Sort"
import { useState } from "react"
import { Popup } from "components/Popup"
import { Button } from "components/Button"
import New from "components/icons/New"
import Create from "components/icons/Create"

export const Layout = ({ children, user }) => {
    const [createPopup, setCreatePopup] = useState(false)
    const router = useRouter()

    const composePost = () => {
        router.replace("/compose/post")
    }

    const handlePopup = () => setCreatePopup(!createPopup)

    return (
        <div className="flex flex-col gap-5 p-4">
            <Navbar user={user} />
            <Sort />
            {children}
            <button
                className="fixed z-10 bottom-6 right-6 w-14 h-14 rounded-full bg-black text-white"
                onClick={handlePopup}
            >
                <New fill="#FFF" />
                <AnimatePresence>
                    {createPopup && (
                        <Popup className={"flex flex-col gap-4 w-fit -left-32 -top-52"}>
                            <div>
                                <h5>Create New</h5>
                            </div>
                            <Button
                                onClick={composePost}
                                className={"flex items-center justify-center border hover:bg-gray-100 "}
                            >
                                <div className="w-8">
                                    <Create />
                                </div>
                                <span className="block">Post</span>
                            </Button>
                        </Popup>
                    )}
                </AnimatePresence>
            </button>
        </div>
    )
}
