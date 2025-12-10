import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import LessonDetails from "../pages/LessonDetails/LessonDetails";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Statistics from "../pages/Dashboard/Common/Statistics";
import ExploreLessons from "../components/Dashboard/ExploreLessons/ExploreLessons";
import Pricing from "../components/Dashboard/Pricing/Pricing";
import AddLessonForm from "../components/Form/AddLessonForm";
import MainLayout from "../layouts/MainLayout";
import Profile from "../pages/Dashboard/Common/Profile";
import MyLessons from "../layouts/MyLessons";
import EditLesson from "../components/Form/EditLesson";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/add-lesson", element: <AddLessonForm /> },
      { path: "/explore-lessons", element: <ExploreLessons /> },
      { path: "/lessons/:id", element: <LessonDetails /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/my-lessons", element: <MyLessons /> },
      { path: "/edit-lesson/:id", element: <EditLesson /> },
      { path: "profile", element: <Profile /> },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <Statistics /> },
          { path: "manage-users", element: <ManageUsers /> },
        ],
      },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);
