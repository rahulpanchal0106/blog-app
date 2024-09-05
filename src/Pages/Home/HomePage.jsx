import { Link } from "react-router-dom"
import NavBar from "../../Components/NavBar/NavBar"

const HomePage = ()=>{
    return(
        <>
            <NavBar/>
        
            <div className="w-screen h-screen bg-white flex flex-col lg:flex-row justify-evenly items-center">
                <div className="flex flex-col justify-left mt-28 lg:mt-0 px-5">
                    <p className="w-full text-6xl lg:text-9xl px-2 py-4 ">
                        Human
                        <br />
                        stories & ideas
                    </p>
                    <p className="w-full text-2xl px-2 py-4">
                        A place to read, write, and deepen your understanding
                    </p>
                    <Link to="/login">
                        <button type="submit" className="w-1/2 mt-5 flex flex-row items-center justify-evenly rounded-full border border-solid border-gray-400 px-5 py-3 border-black hover:bg-white bg-black text-white hover:text-black" >
                            Start Reading
                        </button>
                    </Link>
                </div>
                <img src="/bg.svg" alt="" className="w-80 lg:w-96" />
            </div>
        
        </>
    )
}

export default HomePage