import { Layout } from "components/Layout"
import { Post as post } from "components/post"
import { useUser } from "hooks/useUser"

const Post = ({ json, id }) => {
    const { user } = useUser()

    console.log(id)
    return (
        <Layout user={user} home>
            {json && <post.Base data={{ ...json, id }} detail />}
        </Layout>
    )
}

export const getServerSideProps = async ({ params }) => {
    const { id } = params
    console.log(id)
    const res = await fetch(`http://localhost:3000/api/post/${id}`)
    if (res.ok) {
        const json = await res.json()
        return { props: { json, id } }
    }
    return { props: {} }
}

export default Post
