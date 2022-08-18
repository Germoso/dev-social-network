import { useState } from "react"
import { useRouter } from "next/router"
import { AnimatePresence } from "framer-motion"
import { Navbar } from "components/Navbar"
import { Sort } from "components/Navbar/Sort"
import { Popup } from "components/Popup"
import { Button } from "components/Button"
import New from "components/icons/New"
import Create from "components/icons/Create"
import Home from "components/icons/Home"

export const Layout = ({ children, user, home, sort, setSort }) => {
    const [createPopup, setCreatePopup] = useState(false)
    const router = useRouter()

    const composePost = () => {
        router.replace("/compose/post")
    }

    const handlePopup = () => setCreatePopup(!createPopup)

    const goHome = () => {
        router.push("/home")
    }

    return (
        <div className="w-full flex flex-col gap-5 p-4  mb-20 bg-white h-full">
            <Navbar user={user} />
            <Sort sort={sort} setSort={setSort} />
            {children}
            <div className="fixed bottom-6 right-0 px-6 flex justify-end gap-5 2xl:mx-20">
                {home && (
                    <button className="w-14 h-14 rounded-full " onClick={goHome}>
                        <Home />
                    </button>
                )}
                <button className="relative w-14 h-14 rounded-full bg-black text-white" onClick={handlePopup}>
                    <New fill="#FFF" />
                    <AnimatePresence>
                        {createPopup && (
                            <Popup className={"flex flex-col gap-4 w-fit -left-32 -top-36"}>
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
        </div>
    )
}
