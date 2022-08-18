export const Sort = ({ sort, setSort }) => {
    const lastest = () => setSort("timeAgo")
    const mostLiked = () => setSort("likes")

    return (
        <div className="w-full flex p-2 bg-gray-100 rounded">
            <button onClick={lastest} className={`grow rounded transition-all ${sort === "timeAgo" && "bg-white"}`}>
                Lastest
            </button>
            <button onClick={mostLiked} className={`grow rounded transition-all ${sort === "likes" && "bg-white"}`}>
                Most Liked
            </button>
        </div>
    )
}
