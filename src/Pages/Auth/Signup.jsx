import { useState } from "react"
import NavBar from "../../Components/NavBar/NavBar"
import axios from "axios";
import toast, { LoaderIcon } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = ()=>{
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isLoading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [responseData, setResponseData] = useState({})
    const navigate = useNavigate();

    const handleUsernameChange = (event)=>{
        if(/^\d+$/.test(event.target.value)){
            console.error("Not allowed");
            toast.error("username cannot be a number")
            return;
        }
        setUsername(event.target.value)
    }
    const handleNameChange = (event)=>{
        setName(event.target.value)
    }
    const handlePasswordChange = (event)=>{
        setPassword(event.target.value)
    }
    const handleConfirmPassChange = (event)=>{
        setConfirmPass(event.target.value)
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()
        if(confirmPass!==password){
            toast.error("Passwords didn't match")
            return;
        }
        const payload = {
            username: username,
            name:name,
            password: password
        }
        setLoading(true)
        try{
            const resp = await axios.post('/signup',payload)
            setResponseData(resp.data);
            toast.success('You are signed up!')
            setTimeout(()=>navigate('/login'),1000)

        }catch(e){
            console.error("Error signing up: ",e.message)
            setResponseData(e.response?e.response.data:{message:'failed to sign up'})
            toast.error(e.response.data.message || "Failed to signup")
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
            <div className="w-screen h-full bg-white fixed top-16 flex flex-col items-center justify-start px-5">
                <form action="" onSubmit={handleSubmit} className="px-5 py-10 h-full flex flex-col justify-center items-center ">
                    <p className="text-4xl mb-7">
                        Sign Up to BlogApp
                    </p>
                    <input type="text" required onChange={handleNameChange} className="w-full px-5 py-3 mb-2 text-lg rounded-full border border-solid border-black" placeholder="Name" />
                    <input type="text" value={username} required onChange={handleUsernameChange} className="w-full px-5 py-3 mb-2 text-lg rounded-full border border-solid border-black" placeholder="Username" />
                    <div className="flex w-full flex-row items-center justify-center">
                        <input required type={showPass?"text":"password"} onChange={handlePasswordChange} className="w-full px-5 py-3 mb-2 text-lg rounded-full border border-solid border-black" placeholder="Password" />
                        
                    </div>
                    <div className="flex w-full flex-row items-center justify-center mb-2 ">
                        <input required type={showPass?"text":"password"} onChange={handleConfirmPassChange} className="w-full px-5 py-3 text-lg rounded-full border border-solid border-black" placeholder="Confirm Password" />
                        <button onClick={handleShowPassword} className="ml-5" > 
                            {
                                !showPass?
                                <FaEye/>:<FaEyeSlash/>
                            }
                        </button>
                    </div>

                    <button type="submit" className="w-1/2 flex flex-row items-center justify-evenly rounded-full border border-solid border-gray-400 px-5 py-3 hover:border-black bg-gray-100 hover:bg-black hover:text-white text-black" >
                        {isLoading?<LoaderIcon/>:''}Sign Up
                    </button>
                    <p className="mt-20">
                        Already have an account? <Link to="/login">Log In</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Signup