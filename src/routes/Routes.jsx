import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import LessonDetails from "../pages/LessonDetails/LessonDetails";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Statistics from "../pages/Dashboard/Common/Statistics";
import ExploreLessons from "../components/Dashboard/ExploreLessons/ExploreLessons";
import Pricing from "../components/Dashboard/Pricing/Pricing";
import AddLessonForm from "../components/Form/AddLessonForm";
import MainLayout from "../layouts/MainLayout";
import Profile from "../pages/Dashboard/Common/Profile";
import MyLessons from "../layouts/MyLessons";
import EditLesson from "../components/Form/EditLesson";

// Admin Dashboard Components

import AdminDashboardLayout from "../components/Dashboard/AdminDashboard/AdminDashboardLayout";
import AdminOverview from "../components/Dashboard/AdminDashboard/AdminOverview";
import ManageUsers from "../components/Dashboard/AdminDashboard/ManageUsers";
import ManageLessons from "../components/Dashboard/AdminDashboard/ManageLessons";
import AdminProfile from "../components/Dashboard/AdminDashboard/AdminProfile";
import Payment from "../components/Dashboard/Payment/Payment";
import PaymentSuccess from "../components/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../components/Dashboard/Payment/PaymentCancelled";
import Favorites from "../layouts/Favorites";
import ReportedLessons from "../components/Dashboard/AdminDashboard/ReportedLesson";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "add-lesson", element: <AddLessonForm /> },
      { path: "explore-lessons", element: <ExploreLessons /> },
      { path: "lessons/:id", element: <LessonDetails /> },
      { path: "pricing", element: <Pricing /> },
      { path: "pricing/:lessonId", element: <Pricing /> },
      { path: "my-lessons", element: <MyLessons /> },
      { path: "edit-lesson/:id", element: <EditLesson /> },
      { path: "profile", element: <Profile /> },
      { path: "payment/:lessonId", element: <Payment /> },
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "payment-cancelled/:lessonId", element: <PaymentCancelled /> },
      { path: "favorites-lessons", element: <Favorites /> },

      // User Dashboard
      {
        path: "dashboard",
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

      // Admin Dashboard
      {
        path: "admin",
        element: (
          <PrivateRoute>
            <AdminDashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <AdminOverview /> },
          { path: "overview", element: <AdminOverview /> },
          { path: "manage-users", element: <ManageUsers /> },
          { path: "manage-lessons", element: <ManageLessons /> },
          { path: "report-lessons", element: <ReportedLessons /> },
          { path: "profile", element: <AdminProfile /> },
        ],
      },
    ],
  },

  { path: "login", element: <Login /> },
  { path: "signup", element: <SignUp /> },
]);
