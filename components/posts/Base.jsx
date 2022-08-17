import { motion } from "framer-motion"
import { Image } from "components/Image/Image"
import Likes from "components/icons/Likes"
import Share from "components/icons/Share"
import Options from "components/icons/OptionsHorizontal"
import { useTimeAgo } from "hooks/useTimeAgo"
import { useEffect } from "react"

export const Base = ({ user, post, likes }) => {
    const { photoURL, displayName, message, timeAgo } = user
    const { count, unit } = useTimeAgo(timeAgo)

    return (
        <motion.div
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
            className="py-4 border-b"
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Image alt={displayName} src={photoURL} className={"w-10 rounded-full overflow-clip"} />
                    <span className="font-normal">{displayName}</span>
                    <span className="text-gray-400">
                        {count}
                        {unit}
                    </span>
                </div>
                <div className="w-6">
                    <Options />
                </div>
            </div>
            <div className="py-2">
                <p className="text-sm">{message}</p>
            </div>
            <div className="flex items-center gap-5 py-2">
                <div className="w-10">
                    <Likes count={likes} />
                </div>
                <div className="w-6">
                    <Share />
                </div>
            </div>
        </motion.div>
    )
}
