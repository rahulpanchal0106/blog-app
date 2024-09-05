import { Link } from "react-router-dom"
import { useCookies} from "react-cookie"
import { FaFeather, FaScroll, FaSignOutAlt } from "react-icons/fa";

const NavBar = ()=>{
    const [cookies, setCookie, removeCookie] = useCookies(['authToken'])
    const auth = cookies.authToken;

    const logout = ()=>{
        removeCookie('blogUser')
        removeCookie('authToken')
    }
    return(
        <div className="z-50 fixed bg-white w-screen h-16 flex flex-row items-center justify-between px-10 py-5">
            <div className="text-xl font-bold md:text-4xl lg:text-4xl w-40">
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
                        <button className="p-2 rounded-full hover:bg-gray-200">
                            <FaScroll/>
                        </button>
                    </Link>
                    <Link to="/create">
                        <button className="p-2 rounded-full hover:bg-gray-200">
                            <FaFeather/>
                        </button>
                    </Link>
                    <button onClick={()=>logout() } className="p-2 rounded-full hover:bg-gray-200">
                        <FaSignOutAlt color="red"/>
                    </button>
                    
                </div>)
            }
        </div>
    )
}

export default NavBar