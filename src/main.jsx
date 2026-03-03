import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import TeamPage from "./Pages/TeamPage.jsx";
import Projects from "./components/Project/page.jsx";
import AboutClub from "./components/Home/AboutUs.jsx";
import TeamMemberForm from "./components/Team/TeamMemberForm.jsx";
import AdminPage from "./Pages/AdminPage.jsx";
import Signup from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import Protected from "./Protected.jsx";
import ProjectDetail from "./Pages/ProjectDetailPage.jsx";
import EditProject from "./components/Project/EditProject.jsx";
import AddProject from "./components/adminPanal/ui/AddProjectForm.jsx";
import ContactUs from "./components/Home/ContactUs.jsx";

const router = createBrowserRouter([
  {
    path: "/", //done-f
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> }, //done-f
      { path: "/about", element: <AboutClub /> }, //done-f
      { path: "/contact", element: <ContactUs /> }, //done-f
      { path: "/members", element: <TeamPage /> }, //done-f
      { path: "/projects", element: <Projects /> }, //done-f
      { path: "/projects/:id", element: <ProjectDetail /> }, //done-f

      { path: "/signup", element: <Signup /> }, //done-f

      { path: "/login", element: <Login /> }, //done-f

      { path: "/add-members", element: <TeamMemberForm /> }, //done-f

      {
        path: "/admin", //f-ho jayega badd me
        element: (
          <Protected role="Admin" >
            <AdminPage />
          </Protected>
        ),
      },
      {
        path: "/admin/add-project",
        element: (<Protected role="Admin">
          <AddProject />
        </Protected>)
      },
      {
        path: "/admin/projects/edit/:id",
        element: (<Protected role="Admin">
          <EditProject />
        </Protected>)
      }

    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
