import TimeAgo from 'react-timeago'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import toast, { LoaderIcon } from 'react-hot-toast';
import Update from './EditPost';
import {FaArrowLeft, FaEdit, FaTrash} from 'react-icons/fa'
import Open from './openPost';

const Blog = ({data,key})=>{
    const [cookies, setCookie, removeCookie] = useCookies(['authToken','blogUser'])
    const [deleteIsLoading, setDeleteLoading] = useState(false)
    const authToken = cookies.authToken;
    const username = cookies.blogUser;
    const [isEditing, setEditing] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const blogId = data._id;
    
    
    const handleDelete = async (e)=>{
        e.preventDefault()
        try{
            setDeleteLoading(true)
            await axios.delete(`/feed/${blogId}`,{
                headers:{
                    authorization: `Meow ${authToken}`
                }
            })
            toast.success("Blog Deleted")
            window.location.reload()
        }catch(e){
            console.error("Error deleting blog: ",e.messa)
            toast.error(e.response.data.message || "Could not delete the blog" )
        }finally{
            setDeleteLoading(false)
        }
    }
    const handleUpdate = async (e)=>{
        e.preventDefault()
        setEditing(!isEditing)
    }

    const handleOpen = (e)=>{
        e.preventDefault();
        setOpen(!isOpen)
    }
    

    return (
        <div key={key} className="bg-white flex flex-col w-full px-5 py-3 mt-3 rounded-2xl break-words " style={{overflowWrap:'anywhere'}}>
            <div className="mb-3 text-xs">
                {data.author.name || "Name"} 
            </div>
            <div className="mb-3 text-3xl" onClick={handleOpen} style={{cursor:"pointer"}} >
                <strong>{data.title}</strong>
            </div>
            <div className="mb-3 w-5/6 text-sm text-gray-500 truncate" onClick={handleOpen} style={{cursor:"pointer"}}>
                {data.content.split('\n')[0]}
            </div>
            <div className="w-full flex justify-between items-center text-gray-500">
                <div className="text-xs">
                    <div>{
                        <TimeAgo date={data.createdAt}/>
                    }</div>
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
            
            <div className="w-full flex justify-center items-center mt-7">
                <div className="border border-gray-200 border-solid w-2/3"></div>
            </div>

            {
                isEditing&&<div className='absolute top-20 left-2 md:left-30 lg:left-1/2 '>
                    <Update data={data} />
                    <button onClick={handleUpdate} className='p-5 bg-gray-100 rounded-full fixed'><FaArrowLeft/></button>
                </div>
            }

            {
                isOpen&&<div className='absolute top-0 left-0 '>
                    <Open data={data} />
                    <button onClick={handleOpen} className='p-5 bg-gray-100 top-16 lg:top-20 left-5 lg:left-10 rounded-full fixed z-10 '><FaArrowLeft/></button>
                </div>

            }
        </div>
    )
}
export default Blog