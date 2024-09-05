import { useState } from "react"
import axios from "axios";
import toast, { LoaderIcon } from "react-hot-toast";
import { useCookies } from "react-cookie";

const  Update = ({data})=>{
    const [title, setTitle] = useState(data.title);
    const [content, setContent] = useState(data.content);
    const [isLoading, setLoading] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['authToken','blogUser'])
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
            await axios.put(`/feed/${data._id}`,payload,{
                headers:{
                    authorization: `Meow ${authToken}`
                }
            })
            toast.success('Blog Updated!')
            setTimeout(()=>window.location.reload(),1000)

        }catch(e){
            console.error("Error signing up: ",e.message)
            toast.error(e.response.data.message || "Failed to post the blog")
        }finally{
            setLoading(false)
        }

    }

    return (
        
        <div className="w-10/11 lg:w-1/2 h-2/3 bg-white fixed flex flex-col drop-shadow-2xl rounded-3xl items-center justify-start px-5">
            <form action="" onSubmit={handleSubmit} className="px-5 w-full py-10 h-full flex flex-col justify-center items-center ">
                <p className="text-4xl mb-7">
                    Update the Blog
                </p>
                <input 
                    type="text" 
                    required 
                    value={title}
                    onChange={handleTitleChange} 
                    className="w-full px-5 py-3 mb-2 text-xl font-bold outline-none " 
                    placeholder="Title" 
                />
                <div className="w-full flex justify-center items-center ">
                    <div className="border border-gray-200 border-solid w-2/3"></div>
                </div>
                <textarea 
                    required
                    value={content}
                    className="text-lg w-full h-1/2 outline-none px-5 py-3 mb-5" 
                    placeholder="Content" 
                    onChange={handleContentChange}
                    style={{
                        resize:'none',
                        whiteSpace:'pre-wrap'
                    }}
                ></textarea>

                <button type="submit" className="w-1/2 flex flex-row items-center justify-evenly rounded-full border border-solid border-gray-400 px-3 py-1 hover:border-black bg-gray-100 hover:bg-black hover:text-white text-black" >
                    {isLoading?<LoaderIcon/>:''} Update
                </button>
            </form>
        </div>
    )
}

export default Update