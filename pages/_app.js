import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
    return (
        <div className="h-screen  sm:py-5 sm:max-w-sm mx-auto ">
            <div className="h-full w-full border-2  border-black bg-white overflow-auto">
                <Component {...pageProps} />
            </div>
        </div>
    )
}

export default MyApp
