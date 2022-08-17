import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getTimeline } from "../../Firebase/client"
import { useUser } from "hooks/useUser"

import { Layout } from "components/Layout"
import { Post } from "components/posts"
import { Timestamp } from "firebase/firestore"

const INITIAL_USER = {
    displayName: "",
    photoURL: "",
    uid: "",
}

const Index = () => {
    const [timeline, setTimeline] = useState([])
    const { user } = useUser(INITIAL_USER)

    useEffect(() => {
        console.log(timeline)
    }, [timeline])

    useEffect(() => {
        getTimeline().then((data) => {
            setTimeline(data)
        })
    }, [])

    return (
        <Layout user={user}>
            <motion.section className="container mx-auto">
                {timeline.map((data) => {
                    // console.log(+data.timeAgo.toDate())
                    return <Post.Base user={data} key={data.id} likes={"10"} />
                })}
            </motion.section>
        </Layout>
    )
}

export default Index
