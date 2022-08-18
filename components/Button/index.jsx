import { motion } from "framer-motion"

export const Button = ({ children, className, onClick, disabled }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{
                type: "spring",
                damping: 10,
                stiffness: 1000,
            }}
            disabled={disabled}
            onClick={onClick}
            className={`${className} px-4 py-2 rounded-md disabled:border-gray-400 disabled:text-gray-400`}
        >
            {children}
        </motion.button>
    )
}
