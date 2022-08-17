import { useEffect, useState } from "react"

const DATE_UNITS = [
    ["d", 86400],
    ["h", 3600],
    ["m", 60],
    ["s", 1],
]

const getTimeDiff = (timestamp) => {
    const now = Date.now() / 1000
    const diff = now - timestamp.seconds
    for (const [unit, value] of DATE_UNITS) {
        if (diff > value) {
            const count = Math.floor(diff / value)
            return { count, unit }
        }
    }
}

export const useTimeAgo = (timestamp) => {
    const [timeAgo, setTimeAgo] = useState({ count: 0, unit: "" })
    useEffect(() => {
        setTimeAgo(getTimeDiff(timestamp))
    }, [timestamp])
    setInterval(() => {
        setTimeAgo(getTimeDiff(timestamp))
    }, 60000)
    return timeAgo
}
