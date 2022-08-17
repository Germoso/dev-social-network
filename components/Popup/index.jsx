import { motion } from "framer-motion"

export const Popup = ({ className, children }) => {
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, x: 50, y: 40 }}
            className={`-z-20 relative border-2 border-black p-4 rounded bg-white text-black  ${className}`}
        >
            {children}
        </motion.div>
    )
}
