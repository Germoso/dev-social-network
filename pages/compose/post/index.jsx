import { useEffect, useState } from "react"
import { useUser } from "hooks/useUser"
import { useRouter } from "next/router"
import { createPost, uploadImage } from "../../../Firebase/client"
import { serverTimestamp } from "firebase/firestore"
import { Button } from "components/Button"
import { Modal } from "components/Modal"
import { AnimatePresence } from "framer-motion"
import Upload from "components/icons/Upload"
import Loader from "components/icons/Loader"
import { getDownloadURL } from "firebase/storage"
import { Image } from "components/Image/Image"
import { useCurrentUser } from "hooks/useCurrentUser"

const IMAGE_STATUS = {
    ERROR: Symbol("error"),
    NULL: Symbol("null"),
    LOADING: Symbol("loading"),
    LOADED: Symbol("loaded"),
}

const Index = () => {
    const [modal, setModal] = useState(false)
    const [modalMessage, setModalMessage] = useState("")
    const currentUser = useCurrentUser().uid
    const [status, setStatus] = useState(IMAGE_STATUS.NULL)
    const { user } = useUser(undefined)
    const [message, setMessage] = useState("")
    const [imgURL, setImgURL] = useState("")
    const [post, setPost] = useState()
    const router = useRouter()

    useEffect(() => {
        console.log(currentUser)
        if (!currentUser) {
            router.push("/home")
            setModalMessage("Sign in to create a post")
            setModal(true)
            setTimeout(() => {
                setModal(false)
                setTimeout(() => {
                    router.push("/")
                }, 1000)
            }, 2000)
        }
    }, [router, currentUser])

    useEffect(() => {
        post &&
            createPost(post).then(() => {
                router.push("/home")
            })
        console.log(post)
    }, [post, router])

    const handleUploadChange = (evt) => {
        const file = evt.target.files[0]
        setStatus(IMAGE_STATUS.LOADING)
        uploadImage(file).then(({ ref }) => {
            getDownloadURL(ref).then((URL) => {
                setImgURL(URL)
                setStatus(IMAGE_STATUS.LOADED)
            })
        })
    }

    const handleMessageChange = (evt) => {
        setMessage(evt.target.value)
    }

    const addNewPost = () => {
        setPost({ imgURL, message, ...user, timeAgo: serverTimestamp(), likes: [] })
    }

    return (
        <div className="flex flex-col w-full h-screen justify-between">
            <div className="pb-40 self-stretch grow">
                <textarea
                    onChange={(evt) => {
                        handleMessageChange(evt)
                    }}
                    className="w-full h-1/2 p-3 resize-none"
                    placeholder="Create your post..."
                ></textarea>
                {imgURL && (
                    <div className="max-w-sm mx-auto px-3 rounded-md overflow-clip">
                        <Image src={imgURL} alt={imgURL} className="w-full rounded-xl  overflow-clip" />
                    </div>
                )}
            </div>
            <div className="fixed bottom-0 left-0 w-full bg-white">
                <div>
                    <div className="flex justify-between p-3">
                        <div className="flex items-center">
                            <div className="cursor-pointer">
                                <label htmlFor="file">
                                    <div className="w-10">
                                        <Upload />
                                    </div>
                                </label>
                                <input type="file" name="file" id="file" onChange={handleUploadChange} hidden />
                            </div>
                            {status.description === "loading" && (
                                <div className="w-10">
                                    <Loader />
                                </div>
                            )}
                        </div>
                        <div className="w-full flex justify-end gap-3 ">
                            <Button
                                className={"border-2 border-red-500"}
                                onClick={() => {
                                    router.replace("/home")
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className={"border-2 border-black"}
                                onClick={() => {
                                    addNewPost()
                                }}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
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
        </div>
    )
}

export default Index
