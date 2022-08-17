import React from "react"

function Icon({ fill }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={"100%"} viewBox="0 0 21 21">
            <g
                fill={fill || "none"}
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path
                    d="M10.595 10.5l2.905-3-2.905-3M13.5 7.5h-9M10.5.5l-8 .002c-1.104.001-2 .896-2 2v9.995a2 2 0 002 2h8.095"
                    transform="translate(4 3)"
                ></path>
            </g>
        </svg>
    )
}

export default Icon
