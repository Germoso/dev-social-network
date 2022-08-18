import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { loginWithGithub } from "Firebase/client"
import { useUser } from "hooks/useUser"
import { AnimatePresence, motion } from "framer-motion"
import { Modal } from "components/Modal"
import Logo from "components/icons/Logo"
import Github from "components/icons/Github"
import Loader from "components/icons/Loader"
import { Button } from "components/Button"
import { Image } from "components/Image/Image"

const STATUS = {
    ERROR: Symbol("Error"),
    UNKNOWN: Symbol("User unknown"),
    LOADING: Symbol("Loading"),
    LOGGED: Symbol("Logged"),
}

export default function Home() {
    const router = useRouter()
    const { user } = useUser()
    const [status, setStatus] = useState(STATUS.UNKNOWN)
    const [errorMessage, setErrorMessage] = useState("")
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (user) {
            setStatus(STATUS.LOGGED)
            setTimeout(() => {
                router.push("/home")
            }, 3000)
        }
    }, [user, router])

    useEffect(() => {
        status.description === "Error" ? setShowModal(true) : setShowModal(false)
    }, [status])

    const handleLoginWithGithub = () => {
        setStatus(STATUS.LOADING)
        loginWithGithub().catch((error) => {
            setStatus(STATUS.ERROR)
            setErrorMessage(error.message)
        })
        setStatus(STATUS.LOADING)
    }

    return (
        <div className="relative w-full h-full flex flex-col gap-5 justify-center items-center">
            <div className="flex flex-col items-center">
                <div className="w-52 h-52">
                    <Logo />
                </div>
                <span className="text-sm">Lorem ipsum dolor sit amet consectetur</span>
            </div>
            <div>
                {status.description === "Loading" ? (
                    <div className="w-10">
                        <Loader stroke={"#000"} />
                    </div>
                ) : (
                    <Button
                        onClick={handleLoginWithGithub}
                        disabled={status.description === "Logged"}
                        className={` flex items-center justify-center gap-2 border-2 border-black p-3 rounded-xl ${
                            status.description === "Logged" && "text-gray-400 border-gray-400"
                        }`}
                    >
                        <Github fill={`${status.description === "Logged" && "rgb(156, 163, 175)"}`} /> Login with Github
                    </Button>
                )}
            </div>

            {status.description === "Logged" && (
                <motion.div
                    className="absolute w-full h-full flex flex-col gap-0  items-center left-0 top-0 bg-black text-white"
                    animate={{
                        opacity: 1,
                    }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                >
                    <div className="py-10">
                        <h2 className="text-2xl">Signed as</h2>
                    </div>
                    <div className="z-10 flex flex-col items-center justify-center gap-5 grow">
                        <motion.div className="w-60" animate={{ scale: 1 }} initial={{ scale: 0.2 }}>
                            <Image
                                src={user.photoURL}
                                alt={user.displayName}
                                className="rounded-full overflow-clip w-full"
                            />
                        </motion.div>
                        <motion.span
                            className="block text-center -z-10"
                            animate={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: -50 }}
                            transition={{ duration: 1, type: "spring" }}
                        >
                            {user.displayName}
                        </motion.span>
                        <div className="w-10">
                            <Loader fill={"#FFF"} />
                        </div>
                    </div>
                </motion.div>
            )}

            <AnimatePresence>
                {showModal && (
                    <Modal>
                        <div>
                            <h4 className="text-center bold">Failed logging</h4>
                        </div>
                        <div className="mt-3">
                            <p className="text-red-600">{errorMessage}</p>
                        </div>
                        <div className={"flex justify-end mt-5"}>
                            <Button
                                className={"border-2 border-black"}
                                onClick={() => {
                                    setStatus(STATUS.UNKNOWN)
                                }}
                            >
                                Cerrar
                            </Button>
                        </div>
                    </Modal>
                )}
            </AnimatePresence>
        </div>
    )
}
