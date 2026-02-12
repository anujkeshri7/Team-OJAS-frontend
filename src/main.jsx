import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import TeamPage from './Pages/TeamPage.jsx'
import Projects from './components/Project/page.jsx'
import AboutClub from './components/Home/AboutUs.jsx'
import TeamMemberForm from './components/Project/TeamMemberForm.jsx'



const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children: [
    { path:'/', element:<HomePage/>},
    {path:'/about', element:<AboutClub/>},
    {path:'/contact', element:<h1>Contact</h1>},
    {path:'/members', element:<TeamPage/>},  
    {path:'/projects', element:<Projects/>},
    {path:'/add-members',element:<TeamMemberForm/>}
    ]

      

    }
  
])


createRoot(document.getElementById('root')).render(

  <RouterProvider router={router}/>
 
)
