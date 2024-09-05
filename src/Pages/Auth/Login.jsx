import { useState } from "react"
import NavBar from "../../Components/NavBar/NavBar"
import axios from "axios";
import toast, { LoaderIcon } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['authToken','blogUser'])

    const handleUsernameChange = (event)=>{
        setUsername(event.target.value)
    }
   
    const handlePasswordChange = (event)=>{
        setPassword(event.target.value)
    }


    const handleSubmit = async (event) =>{
        event.preventDefault()
        const payload = {
            username: username,
            password: password
        }
        setCookie('blogUser',username)
        setLoading(true)
        try{
            const resp = await axios.post('/login',payload)
            setCookie('authToken',resp.data.token)
            toast.success('You are Logged in!')
            navigate('/feed')

        }catch(e){
            console.error("Error signing up: ",e.message)
            toast.error(e.response?.data.message || "Failed to signup")
        }finally{
            setLoading(false)
        }

    }
    const handleShowPassword = (event)=>{
        event.preventDefault();
        setShowPass(!showPass)
    }

    return (
        <>
            <NavBar/>
            <div className="w-screen h-full bg-white top-10 fixed flex flex-col items-center justify-start px-5">
                <form action="" onSubmit={handleSubmit} className="px-5 py-10 h-full flex flex-col justify-center items-center ">
                    <p className="text-4xl mb-7">
                        Log in to BlogApp
                    </p>
                    <input type="text" required onChange={handleUsernameChange} className="w-full px-5 py-3 mb-2 text-lg rounded-full border border-solid border-black" placeholder="Username" />
                    <div className="flex w-full flex-row items-center justify-center mb-2">
                        <input required type={showPass?"text":"password"} onChange={handlePasswordChange} className="w-full px-5 py-3 text-lg rounded-full border border-solid border-black" placeholder="Password" />
                        <button onClick={handleShowPassword} className="ml-5" > 
                            {
                                !showPass?
                                <FaEye/>:<FaEyeSlash/>
                            }
                        </button>
                    </div>

                    <button type="submit" className="w-1/2 flex flex-row items-center justify-evenly rounded-full border border-solid border-gray-400 px-5 py-3 hover:border-black bg-gray-100 hover:bg-black hover:text-white text-black" >
                        {isLoading?<LoaderIcon/>:''}Log in
                    </button>
                    <p className="mt-20">
                        Dont have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Login