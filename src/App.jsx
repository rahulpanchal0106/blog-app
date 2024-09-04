import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './Pages/Home/HomePage';
import Feed from './Pages/Feed/GetFeed/Feed';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import Create from './Pages/Feed/Create/Create';

const App = ()=> {
  const router = createBrowserRouter([
    {path:'/',element:<HomePage/>},
    {path:'/feed',element:<Feed/>},
    {path:'/login',element:<Login/>},
    {path:'/signup',element:<Signup/>},
    {path:'/create',element:<Create/>},
    // {path:'/',element:<Login/>},
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
