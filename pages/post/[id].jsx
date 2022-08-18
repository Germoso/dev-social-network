import Head from "next/head"
import { Layout } from "components/Layout"
import { Post as post } from "components/post"
import { useUser } from "hooks/useUser"
import { useRouter } from "next/router"
import { Modal } from "components/Modal"
import Loading from "components/icons/Loader"
import { useEffect, useState } from "react"

const Post = ({ json, id, error }) => {
    const [modal, setModal] = useState(error)
    const { user } = useUser()
    const router = useRouter()

    useEffect(() => {
        modal &&
            setTimeout(() => {
                setModal(false)
                setTimeout(() => {
                    router.push("/")
                }, 1000)
            }, 2000)
    }, [router, modal])

    return (
        <Layout user={user} home sortBar>
            <Head>
                <title>Post|{id}</title>
                <meta name="description" content="App for share with developers"></meta>
            </Head>
            {json && <post.Base data={{ ...json, id }} detail />}
            {modal && (
                <Modal>
                    <div className="w-16">
                        <h5 className="text-red-500 text-xl text-center">Error</h5>
                        <Loading />
                    </div>
                </Modal>
            )}
        </Layout>
    )
}

export const getServerSideProps = async ({ params }) => {
    const { id } = params
    try {
        const res = await fetch(`https://social-network-three-xi.vercel.app/api/post/${id}`)
        console.log(res)
        if (res.ok) {
            const json = await res.json()
            return { props: { json, id, error: false } }
        }
    } catch (error) {}
    return { props: { error: true } }
}

export default Post
