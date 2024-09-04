import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from '../Pages/Home/HomePage';

const App = ()=> {
  const router = createBrowserRouter([
    {path:'/',element:<HomePage/>}
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
