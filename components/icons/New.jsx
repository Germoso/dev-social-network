import React from "react"

function Icon({ fill }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" fill={fill} viewBox="0 0 21 21">
            <g fill={fill} fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.5 10.5h10M10.5 5.5v10"></path>
            </g>
        </svg>
    )
}

export default Icon
