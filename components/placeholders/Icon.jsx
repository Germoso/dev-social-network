import React from "react"

function Icon() {
    return (
        <svg width={"100%"} ariaLabelledby="loading-aria" preserveAspectRatio="none" viewBox="0 0 100 100">
            <rect width="100%" height="100%" fill='url("#fill")' clipPath="url(#clip-path)"></rect>
            <defs>
                <clipPath id="clip-path">
                    <circle cx="50" cy="50" r="50"></circle>
                </clipPath>
                <linearGradient id="fill">
                    <stop offset="0.6" stopColor="#f0f0f0">
                        <animate
                            attributeName="offset"
                            dur="2s"
                            keyTimes="0; 0.25; 1"
                            repeatCount="indefinite"
                            values="-2; -2; 1"
                        ></animate>
                    </stop>
                    <stop offset="1.6" stopColor="#d4d4d4">
                        <animate
                            attributeName="offset"
                            dur="2s"
                            keyTimes="0; 0.25; 1"
                            repeatCount="indefinite"
                            values="-1; -1; 2"
                        ></animate>
                    </stop>
                    <stop offset="2.6" stopColor="#f0f0f0">
                        <animate
                            attributeName="offset"
                            dur="2s"
                            keyTimes="0; 0.25; 1"
                            repeatCount="indefinite"
                            values="0; 0; 3"
                        ></animate>
                    </stop>
                </linearGradient>
            </defs>
        </svg>
    )
}

export default Icon
