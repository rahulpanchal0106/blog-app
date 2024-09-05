import { useEffect, useState } from "react"
import NavBar from "../../../Components/NavBar/NavBar"
import Blog from "../../../Components/Feed/FeedPost"
import axios from "axios"
import toast, { LoaderIcon } from "react-hot-toast"
import { useCookies } from "react-cookie"

const Feed = ()=>{
    const [feedData, setFeedData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['authToken'])

    const fetchData = async()=>{
        try{
            const resp = await axios.get('/feed',{
                headers:{
                    authorization: `Meow ${cookies.authToken}`
                }
            });
            setFeedData(resp.data.data)
            toast.success("Feed Blogs Fetched")
        }catch(e){
            console.error("Error fetching feed");
            toast.error(e.response.data.message || "Error Fetching feed")
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])
    return (
        <div className="flex flex-col justify-start items-center">
            <NavBar/>
            
            <div className="w-full lg:w-1/2  mt-16  flex flex-col-reverse  justify-start items-center break-words" style={{overflowWrap:'anywhere'}}>
                {
                    feedData && !isLoading && feedData.length>0?
                    feedData.map((blog,i)=><Blog data={blog} key={i} />)
                    :<LoaderIcon/>
                }
            </div>
            
            
        </div>
    )
}
export default Feed