import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './Pages/Home/HomePage';
import Feed from './Pages/Feed/GetFeed/Feed';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import Create from './Pages/Feed/Create/Create';
import { useCookies } from 'react-cookie';
import axios from 'axios'
import { Toaster } from 'react-hot-toast';

const App = ()=> {

  const [cookies, setCookie, removeCookie] = useCookies(['authToken'])
  const auth = cookies.authToken;

  axios.defaults.baseURL=import.meta.env.VITE_SERVER

  const router = createBrowserRouter([
    {path:'/',element:!auth?<HomePage/>:<Feed/>},
    {path:'/feed',element:!auth?<Login/>:<Feed/>},
    {path:'/login',element:<Login/>},
    {path:'/signup',element:<Signup/>},
    {path:'/create',element:!auth?<Login/>:<Create/>},
  ])
  return (
    <>
      <RouterProvider router={router}/>
      <Toaster/>
    </>
  )
}

export default App
