import style from "./Image.module.css"
import NextImage from "next/image"

const Image = ({ src, alt, className }) => {
    return (
        <div className={`${style.imageContainer} ${className}`}>
            <NextImage
                src={src}
                alt={alt}
                layout="fill"
                className={`${style.image}`}
            />
        </div>
    )
}

export { Image }
