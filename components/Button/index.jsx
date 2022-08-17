import { motion } from "framer-motion"

export const Button = ({ children, className, onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{
                type: "spring",
                damping: 10,
                stiffness: 1000,
            }}
            onClick={onClick}
            className={`${className} px-4 py-2 rounded-md`}
        >
            {children}
        </motion.button>
    )
}
