import NavBar from "../../Components/NavBar/NavBar"

const HomePage = ()=>{
    return(
        <>
            <NavBar/>
            <div className="w-screen h-screen bg-red-300 flex flex-col justify-center items-center">
                Home page
            </div>
        </>
    )
}

export default HomePage