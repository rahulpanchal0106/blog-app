import TimeAgo from 'react-timeago'
import { useUser } from '../../../Contexts/UserContext'

const Blog = ({data,key})=>{
    const {username} = useUser()
    
    const handleDelete = async (e)=>{

    }
    const handleUpdate = async (e)=>{

    }

    return (
        <div key={key} className="bg-white flex flex-col w-full px-5 py-3 mt-3 rounded-2xl ">
            <div className="mb-3 text-xs">
                {data.author.name || "Name"} 
            </div>
            <div className="mb-3 text-4xl" >
                <strong>{data.title}</strong>
            </div>
            <div className="mb-3 w-5/6 text-sm text-gray-500 truncate">
                {data.content.split('\n')[0]}
            </div>
            <div className="w-full flex justify-between items-center text-gray-500">
                <div className="">
                    <div>{
                        <TimeAgo date={data.createdAt}/>
                    }</div>
                    {/* <button>Upvote</button>
                    <button>Comment</button> */}
                </div>
                <div>
                    {
                        data.author.username === username?
                        (
                            <div className='flex flex-row w-full'>
                                <button onClick={handleDelete}>
                                    Delete
                                </button>
                                <button onClick={handleUpdate}>
                                    Update
                                </button>
                            </div>
                        ):""
                    }
                </div>
            </div>
            {/* The bottom border line */}
            <div className="w-full flex justify-center items-center mt-7">
                <div className="border border-gray-200 border-solid w-2/3"></div>
            </div>
        </div>
    )
}
export default Blog