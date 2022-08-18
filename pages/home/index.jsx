import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getTimeline } from "../../Firebase/client"
import { useUser } from "hooks/useUser"
import { Layout } from "components/Layout"
import { Post } from "components/post"

const INITIAL_USER = {
    displayName: "",
    photoURL: "",
    uid: "",
}

const Index = () => {
    const [timeline, setTimeline] = useState([])
    const { user } = useUser(INITIAL_USER)
    const [sort, setSort] = useState("timeAgo")

    useEffect(() => {
        getTimeline(sort).then((data) => {
            setTimeline(data)
        })
    }, [sort])

    return (
        <Layout user={user} sort={sort} setSort={setSort}>
            <motion.section className="container mx-auto">
                {timeline.map((data) => {
                    return <Post.Base data={data} key={data.id} />
                })}
            </motion.section>
        </Layout>
    )
}

export default Index
