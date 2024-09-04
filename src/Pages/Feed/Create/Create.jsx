import NavBar from "../../../Components/NavBar/NavBar"

const Create = ()=>{
    return (
        <>  
            <NavBar/>
            <div className="w-screen h-full bg-red-200 fixed top-16 flex flex-col items-center justify-start px-5">
                Create a Blog!    
            </div>
        </>
    )
}
export default Create