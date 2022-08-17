import { motion } from "framer-motion"

export const Modal = ({ children, className }) => {
    return (
        <div className={`fixed top-0 left-0 w-full h-screen flex justify-center items-center  backdrop-blur-sm`}>
            <motion.div
                className={`mx-2 p-8 bg-white  rounded-md border shadow-2xl ${className}`}
                animate={{ y: [-400, 0] }}
                exit={{ y: -400, opacity: 0 }}
            >
                {children}
            </motion.div>
        </div>
    )
}
