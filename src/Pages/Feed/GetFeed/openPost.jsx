import { useState } from "react"
import TimeAgo from 'react-timeago'
import axios from "axios";
import toast, { LoaderIcon } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../Components/NavBar/NavBar";
import { useCookies } from "react-cookie";
import Update from "./EditPost";
import { FaArrowLeft, FaDotCircle, FaEdit, FaStepBackward, FaTrash } from "react-icons/fa";

const  Open = ({data})=>{
    const [title, setTitle] = useState(data.title);
    const [content, setContent] = useState(data.content);
    const [isEditing, setEditing] = useState(false)
    const [deleteIsLoading, setDeleteLoading] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['authToken','blogUser'])
    const username = cookies.blogUser
    const authToken = cookies.authToken;

    const handleUpdate = async (e)=>{
        e.preventDefault()
        setEditing(!isEditing)
    }
    const handleDelete = async (e)=>{
        e.preventDefault()
        try{
            setDeleteLoading(true)
            await axios.delete(`/feed/${data._id}`,{
                headers:{
                    authorization: `Meow ${authToken}`
                }
            })
            toast.success("Blog Deleted")
        }catch(e){
            console.error("Error deleting blog: ",e.messa)
            toast.error(e.response.data.message || "Could not delete the blog" )
        }finally{
            setDeleteLoading(false)
        }
    }
    return (
        <>
            <NavBar/>
            <div className="w-screen h-full top-10 lg:top-6 bg-white fixed flex flex-col items-center justify-start px-5">
                <div className="px-0 lg:px-5 w-full lg:w-3/4 py-10 h-full flex flex-col justify-center items-center ">
                    <div className="w-full px-5 py-3 mb-2 text-2xl lg:text-3xl font-bold outline-none ">
                        {title}
                    </div>
                    <div className="w-full flex justify-between items-center text-gray-500">
                        <div className="w-full flex flex-col justify-left items-left px-5 py-3 mb-2 text-sm  outline-none ">
                            <div className="flex flex-row items-center justify-left ">
                                <div className="flex flex-row items-center justify-evenly w-40">
                                    <p className="text-black">
                                        <b>{data.author.name}</b>
                                        <div className="text-xs">
                                            <div className="text-xs">
                                                {
                                                    <TimeAgo date={data.createdAt}/>
                                                }</div>
                            
                                        </div>
                                    </p>
                                    <p className="mb-2">.</p>
                                    <p className="text-xs">{data.author.username}</p>
                                </div>

                            </div>
                            
                        </div>
                        
                        <div className='w-40'>
                            {
                                data.author.username === username?
                                (
                                    <div className='flex flex-row w-full justify-evenly items-center'>
                                        <button onClick={handleDelete} className='hover:text-red-600'>
                                            {
                                                deleteIsLoading?<LoaderIcon/>: <FaTrash size={12}/>
                                            }
                                        </button>
                                        <button onClick={handleUpdate}>
                                            <FaEdit size={15}/>
                                        </button>
                                    </div>
                                ):""
                            }
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center ">
                        <div className="border border-gray-200 border-solid w-2/3"></div>
                    </div>
                    <div className="lg:text-xl text-md w-full h-2/3 overflow-y-scroll  outline-none px-5 py-3 mb-5" 
                        style={{
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {content}
                    </div>
                </div>
            </div>
            {
                isEditing&&<div className='fixed top-20 ' style={{
                    left:window.innerWidth<650?"5%":"25%"
                }}>
                    <Update data={data} />
                    <button onClick={handleUpdate} className='p-5 bg-gray-100 rounded-full fixed z-50'><FaArrowLeft/></button>
                </div>
            }

        </>
    )
}

export default Open