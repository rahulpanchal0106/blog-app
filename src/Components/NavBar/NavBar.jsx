import { Link } from "react-router-dom"

const NavBar = ()=>{
    return(
        <div className="z-50 fixed w-screen h-16 flex flex-row items-center justify-between px-10 py-5">
            <div className="text-4xl">
                <Link to="/">
                    BlogApp
                </Link>
            </div>
            <div className="flex flex-row justify-evenly items-center w-1/2">
                <Link to="/">
                    Home
                </Link>
                <Link to="/feed">
                    Feed
                </Link>
                <Link to="/create">
                    Create
                </Link>
                <Link to="/">
                    Logout
                </Link>
            </div>
        </div>
    )
}

export default NavBar