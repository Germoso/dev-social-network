import React from "react"

function Icon() {
    return (
        <svg width="100%" ariaLabelledby="loading-aria" preserveAspectRatio="none" viewBox="0 0 476 124">
            <rect width="100%" height="100%" fill='url("#fill")' clipPath="url(#clip-path)"></rect>
            <defs>
                <clipPath id="clip-path">
                    <rect width="88" height="6" x="48" y="8" rx="3" ry="3"></rect>
                    <rect width="52" height="6" x="48" y="26" rx="3" ry="3"></rect>
                    <rect width="410" height="6" y="56" rx="3" ry="3"></rect>
                    <rect width="380" height="6" y="72" rx="3" ry="3"></rect>
                    <rect width="178" height="6" y="88" rx="3" ry="3"></rect>
                    <circle cx="20" cy="20" r="20"></circle>
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
