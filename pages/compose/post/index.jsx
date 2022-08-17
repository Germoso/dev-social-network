import { useUser } from "hooks/useUser"
import { useRouter } from "next/router"
import { createPost } from "../../../Firebase/client"
import { useEffect, useState } from "react"
import { serverTimestamp } from "firebase/firestore"

const Index = () => {
    const { user } = useUser(undefined)
    const [message, setMessage] = useState("")
    const [isUploaading, setIsUploading] = useState(false)
    const [post, setPost] = useState()
    const router = useRouter()

    const handleMessageChange = (evt) => {
        setMessage(evt.target.value)
    }

    useEffect(() => {
        post &&
            createPost(post).then(() => {
                // router.push("/home")
                setIsUploading(false)
            })
    }, [post, router])

    const addNewPost = () => {
        setIsUploading(true)
        setPost({ message, ...user, timeAgo: serverTimestamp() })
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
            <div style={{ position: "relative" }}>
                <textarea
                    onChange={(evt) => {
                        handleMessageChange(evt)
                    }}
                    width="100%"
                    rows={10}
                    placeholder="Create your post..."
                ></textarea>
            </div>
            <div>
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                            <button
                                onClick={() => {
                                    router.replace("/home")
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    addNewPost()
                                }}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
