import Head from "next/head"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getTimeline } from "../../Firebase/client"
import { useUser } from "hooks/useUser"
import { Layout } from "components/Layout"
import { Post } from "components/post"
import Loading from "components/icons/Loader"

const INITIAL_USER = {
    displayName: "",
    photoURL: "",
    uid: "",
}

const Index = () => {
    const [timeline, setTimeline] = useState(null)
    const { user } = useUser(INITIAL_USER)
    const [sort, setSort] = useState("timeAgo")

    useEffect(() => {
        getTimeline(sort).then((data) => {
            setTimeline(data)
        })
    }, [sort])

    return (
        <Layout user={user} sort={sort} setSort={setSort}>
            <Head>
                <title>Home</title>
                <meta name="description" content="App for share with developers"></meta>
            </Head>
            <motion.section className="container mx-auto">
                {timeline ? (
                    timeline.map((data) => {
                        return <Post.Base data={data} key={data.id} />
                    })
                ) : (
                    <div className="w-full h-56 flex items-center justify-center">
                        <div className="w-16">
                            <Loading />
                        </div>
                    </div>
                )}
            </motion.section>
        </Layout>
    )
}

export default Index
