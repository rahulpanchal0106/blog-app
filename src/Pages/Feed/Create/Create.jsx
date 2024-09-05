import { useState } from "react"

import axios from "axios";
import toast, { LoaderIcon } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../Components/NavBar/NavBar";
import { useCookies } from "react-cookie";

const  Create = ()=>{
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['authToken'])
    const authToken = cookies.authToken;

    const handleContentChange = (event)=>{
        setContent(event.target.value)
    }
    const handleTitleChange = (event)=>{
        setTitle(event.target.value)
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()
    
        const payload = {
            title: title,
            content:content,
        }

        setLoading(true)
        try{
            await axios.post('/create',payload,{
                headers:{
                    authorization: `Meow ${authToken}`
                }
            })
            toast.success('Blog posted!')
            setTimeout(()=>navigate('/'),1000)

        }catch(e){
            console.error("Error signing up: ",e.message)
            toast.error(e.response.data.message || "Failed to post the blog")
        }finally{
            setLoading(false)
        }

    }

    return (
        <>
            <NavBar/>
            <div className="w-screen h-full bg-white fixed flex flex-col items-center justify-start px-5">
                <form action="" onSubmit={handleSubmit} className="px-5 w-full lg:w-3/4 py-10 h-full flex flex-col justify-center items-center ">
                    <p className="text-4xl mb-7">
                        Make a Blog!
                    </p>
                    <input 
                        type="text" 
                        required 
                        onChange={handleTitleChange} 
                        className="w-full px-5 py-3 mb-2 text-3xl font-bold outline-none " 
                        placeholder="Title" 
                    />
                    <div className="w-full flex justify-center items-center ">
                        <div className="border border-gray-200 border-solid w-2/3"></div>
                    </div>
                    <textarea 
                        required
                        className="text-2xl w-full h-1/2 outline-none px-5 py-3 mb-5" 
                        placeholder="Content" 
                        onChange={handleContentChange}
                        style={{
                            resize:'none'
                        }}
                    ></textarea>

                    <button type="submit" className="w-1/2 flex flex-row items-center justify-evenly rounded-full border border-solid border-gray-400 px-5 py-3 hover:border-black bg-gray-100 hover:bg-black hover:text-white text-black" >
                        {isLoading?<LoaderIcon/>:''} Post
                    </button>
                </form>
            </div>
        </>
    )
}

export default Create