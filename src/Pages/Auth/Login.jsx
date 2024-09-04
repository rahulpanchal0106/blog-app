import NavBar from "../../Components/NavBar/NavBar"

const Login =()=>{
    return (
        <>
            <NavBar/>
            <div className="w-screen h-full bg-red-200 fixed top-16 flex flex-col items-center justify-start px-5">
                Login
            </div>
        </>
    )
}

export default Login