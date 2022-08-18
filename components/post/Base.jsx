import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useTimeAgo } from "hooks/useTimeAgo"
import { useRouter } from "next/router"
import { Image } from "components/Image/Image"
import { Modal } from "components/Modal"
import { Popup } from "components/Popup"
import Likes from "components/icons/Likes"
import Share from "components/icons/Share"
import Options from "components/icons/OptionsHorizontal"
import Trash from "components/icons/Trash"
import { useCurrentUser } from "hooks/useCurrentUser"
import { deletePost } from "Firebase/client"
import { likePost } from "Firebase/client"

const STATUS_MESSAGE = {
    ERROR: "You cannot delete this post",
    DELETED: "Post deleted successfully",
    LOGIN: "Sign in to like the post",
}

export const Base = ({ data, detail }) => {
    const currentUser = useCurrentUser().uid
    const router = useRouter()
    const { photoURL, displayName, message, timeAgo, imgURL, likes, id, uid } = data
    const { count, unit } = useTimeAgo(timeAgo)
    const [showPopup, setShowPopup] = useState(false)
    const [options, setOptions] = useState(false)
    const [modal, setModal] = useState(false)
    const [modalMessage, setModalMessage] = useState("")
    const [likesAmout, setLikesAmount] = useState(likes.length)
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        if (likes.includes(currentUser)) {
            setLiked(true)
        }
    }, [likes, currentUser])

    const like = (e) => {
        e.stopPropagation()

        if (!currentUser) {
            setModalMessage(STATUS_MESSAGE.LOGIN)
            setModal(true)
            setTimeout(() => {
                setModal(false)
                setTimeout(() => {
                    router.push("/")
                }, 1000)
            }, 2000)
        } else {
            if (liked) {
                const unlike = likes.filter((like) => like != currentUser)
                likePost(id, [...unlike])
                setLiked(false)
                setLikesAmount(likesAmout - 1)
            }
            // if (!likes.includes(currentUser))
            else {
                likePost(id, [...likes, currentUser])
                setLikesAmount(likesAmout + 1)
                setLiked(true)
                console.log("no")
            }
            // }
        }

        // if (likes.includes(currentUser)) {
    }

    const share = (e) => {
        e.stopPropagation()
        navigator.clipboard.writeText(`http://localhost:3000/post/${id}`)
    }

    const openPopup = (e) => {
        e.stopPropagation()
        setShowPopup(true)
        setTimeout(() => {
            setShowPopup(false)
        }, 3000)
    }

    const openOptions = (e) => {
        e.preventDefault()
        setOptions(true)
    }

    const postDetail = (e) => {
        console.log(e.target)
        e.stopPropagation()
        router.push(`/post/${id}`)
    }

    const removePost = (e) => {
        if (currentUser === uid) {
            deletePost(id)
            setModalMessage(STATUS_MESSAGE.DELETED)
        } else {
            setModalMessage(STATUS_MESSAGE.ERROR)
        }
        setTimeout(() => {
            setModal(false)
            setTimeout(() => {
                router.push("/home")
            }, 1000)
        }, 2000)
        setModal(true)
        e.stopPropagation()
        setOptions(false)
    }

    return (
        <motion.div
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
            className="py-4 border-b cursor-pointer"
            // whileTap={
            //     !detail && {
            //         scale: 0.9,
            //         transition: {
            //             type: "spring",
            //             damping: "14",
            //             stiffness: "600",
            //         },
            //     }
            // }
            onClick={postDetail}
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Image alt={displayName} src={photoURL} className={"w-10 rounded-full overflow-clip"} />
                    <span className="font-normal">{displayName}</span>
                    {count && (
                        <time className="text-gray-400">
                            <Link href={`/post/${id}`}>
                                <a>
                                    {count}
                                    {unit}
                                </a>
                            </Link>
                        </time>
                    )}
                </div>
                {detail && (
                    <div onClick={openOptions} className="z-10 relative w-6">
                        <Options />
                        <AnimatePresence>
                            {options && (
                                <div onClick={removePost}>
                                    <Popup className={"w-max flex items-center -left-20 top-9"}>
                                        <div className="w-8">
                                            <Trash stroke="#ff0000" />
                                        </div>
                                        <span className="block text-xs font-semibold ">Delete</span>
                                    </Popup>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
            <div className="py-2">
                <p className="text-sm break-words">{message}</p>
            </div>
            {imgURL && <Image alt={imgURL} src={imgURL} className="rounded-md overflow-clip" />}
            <div className="z-10 flex items-center gap-3 py-2">
                <div onClick={(e) => like(e)} className="w-14 p-2">
                    <Likes count={likesAmout} fill={`${liked ? "#ff7373" : "none"}`} />
                </div>
                <div
                    onClick={(e) => {
                        share(e)
                        openPopup(e)
                    }}
                    className="relative w-10 p-2 cursor-pointer"
                >
                    <Share />
                    <AnimatePresence>
                        {showPopup && (
                            <Popup className={"w-max -top-2 left-10"}>
                                <span className="block text-xs">Copied to clipboard</span>
                            </Popup>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <AnimatePresence>
                {modal && (
                    <Modal>
                        <div>
                            <h5>{modalMessage}</h5>
                        </div>
                    </Modal>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
