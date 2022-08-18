import React from "react"

function Icon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 21 21" {...props}>
            <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M.5 9.5l9-9 9 9" transform="translate(1 1)"></path>
                <path d="M2.5 7.5v7a2 2 0 002 2h10a2 2 0 002-2v-7" transform="translate(1 1)"></path>
            </g>
        </svg>
    )
}

export default Icon
