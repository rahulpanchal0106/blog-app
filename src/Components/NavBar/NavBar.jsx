import { Link } from "react-router-dom"
import { useCookies} from "react-cookie"

const NavBar = ()=>{
    const [cookies, setCookie, removeCookie] = useCookies(['authToken'])
    const auth = cookies.authToken;

    const logout = ()=>{
        removeCookie('blogUser')
        removeCookie('authToken')
    }
    return(
        <div className="z-50 fixed bg-white w-screen h-16 flex flex-row items-center justify-between px-10 py-5">
            <div className="text-4xl">
                <Link to="/">
                    BlogApp
                </Link>
            </div>
            {
                !auth?(
                    <div className="flex flex-row justify-evenly items-center w-60" >
                        <Link to="/login">
                            <button className="border border-solid border-black rounded-full px-3 py-1 hover:bg-black hover:text-white">
                                Login
                            </button>
                        </Link>
                        <Link to="/signup" className="border h-fit border-solid border-black rounded-full px-3 py-1 bg-black text-white hover:bg-white hover:text-black">
                            <button>
                                Signup
                            </button>
                        </Link>
                    </div>
                )
                :(<div className="flex flex-row justify-evenly items-center w-96">
                    <Link to="/feed">
                        <button className="hover:underline">
                            Feed
                        </button>
                    </Link>
                    <Link to="/create">
                        <button className="hover:underline">
                            Create
                        </button>
                    </Link>
                    <button onClick={()=>logout() } className="hover:underline">
                        Logout
                    </button>
                    
                </div>)
            }
        </div>
    )
}

export default NavBar