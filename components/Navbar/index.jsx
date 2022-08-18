import { Image } from "components/Image/Image"
import Logout from "components/icons/Logout"
import Icon from "components/placeholders/Icon"
import { signout } from "Firebase/client"
import { useRouter } from "next/router"

export const Navbar = ({ user }) => {
    const router = useRouter()

    const handleSignOut = () => {
        signout().then(() => {
            router.push("/")
        })
    }

    return (
        <nav className="container mx-auto w-full flex justify-between items-center">
            <div className="w-10 rounded-full overflow-clip">
                {user ? <Image src={user.photoURL} alt={user.displayName} /> : <Icon />}
            </div>
            <div>
                <h4 className="font-bold text-lg">Home</h4>
            </div>
            <div className="w-6" onClick={handleSignOut}>
                <Logout />
            </div>
        </nav>
    )
}
