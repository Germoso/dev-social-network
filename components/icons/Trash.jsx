import React from "react"

function Icon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 21 21">
            <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <path
                    d="M2.5 2.5h10v12a2 2 0 01-2 2h-6a2 2 0 01-2-2zm5-2a2 2 0 011.995 1.85l.005.15h-4a2 2 0 012-2zM.5 2.5h14M5.5 5.5v8M9.5 5.5v8"
                    transform="translate(3 2)"
                ></path>
            </g>
        </svg>
    )
}

export default Icon
