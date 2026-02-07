import MainLayout from "../components/layouts/MainLayout";
import PaymentVerify from "../components/PaymentVerify/PaymentVerify";
import { USER_ROLES } from "../constants";
import Articles from "../pages/main/Articles/Articles";
import ArticlesView from "../pages/main/ArticlesView/ArticlesView";
import Branches from "../pages/main/Branches/Branches";
import Checkout from "../pages/main/Checkout/Checkout";
import Courses from "../pages/main/Courses/Courses";
import CoursesFree from "../pages/main/CoursesFree/CoursesFree";
import CoursesView from "../pages/main/CoursesView/CoursesView";
import Dashboard from "../pages/main/Dashboard/Dashboard";
import ExamAnswers from "../pages/main/ExamAnswers/ExamAnswers";
import ExamAttempt from "../pages/main/ExamAttempt/ExamAttempt";
import ExamView from "../pages/main/ExamView/ExamView";
import Gallery from "../pages/main/Gallery/Gallery";
import Home from "../pages/main/Home/Home";
import Leaderboard from "../pages/main/Leaderboard/Leaderboard";
import LecturesView from "../pages/main/LecturesView/LecturesView";
import LiveclassView from "../pages/main/LiveclassView/LiveclassView";
import MultiImage from "../pages/main/MultiImage/MultiImage";
import MyCourses from "../pages/main/MyCourses/MyCourses";
import MyCoursesView from "../pages/main/MyCoursesView/MyCoursesView";
import MyEbooks from "../pages/main/MyEbooks/MyEbooks";
import MyOrders from "../pages/main/MyOrders/MyOrders";
import News from "../pages/main/News/News";
import NewsView from "../pages/main/NewsView/NewsView";
import NotesView from "../pages/main/NotesView/NotesView";
import OrderSuccess from "../pages/main/OrderSuccess/OrderSuccess";
import Product from "../pages/main/Product/Product";
import Profile from "../pages/main/Profile/Profile";
import Purchase from "../pages/main/Purchase/Purchase";
import Reviews from "../pages/main/Reviews/Reviews";
import Shop from "../pages/main/Shop/Shop";
import SSLCommerz from "../pages/main/SSLCommerz/SSLCommerz";
import TeamOditi from "../pages/main/TeamOditi/TeamOditi";
import TermsConditions from "../pages/main/TermsConditions/TermsConditions";
import TodayOditi from "../pages/main/TodayOditi/TodayOditi";
import ProtectedRoute from "./ProtectedRoute";

export const mainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "upload-image",
        element: <MultiImage />,
      },
      {
        path: "about-us",
        element: (
          <h1 className="py-10 text-xl text-center">No content available</h1>
        ),
      },
      {
        path: "articles",
        element: <Articles />,
      },
      {
        path: "branches",
        element: <Branches />,
      },
      {
        path: "article/:articleID",
        element: <ArticlesView />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "free-courses",
        element: <CoursesFree />,
      },
      {
        path: "course/:courseID",
        element: <CoursesView />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute userRoles={[USER_ROLES.student]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "answers/:courseID/exam/:examID",
        element: (
          <ProtectedRoute userRoles={[USER_ROLES.student]}>
            <ExamAnswers />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-course/:courseID/module/:moduleID/exam/:examID/attempt",
        element: (
          <ProtectedRoute userRoles={[USER_ROLES.student]}>
            <ExamAttempt />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-course/:courseID/module/:moduleID/exam/:examID",
        element: (
          <ProtectedRoute userRoles={[USER_ROLES.student]}>
            <ExamView />
          </ProtectedRoute>
        ),
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "leaderboard/:courseID/exam/:examID",
        element: (
          <ProtectedRoute userRoles={[USER_ROLES.student]}>
            <Leaderboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-course/:courseID/module/:moduleID/lecture/:lectureID",
        element: (
          <ProtectedRoute userRoles={[USER_ROLES.student]}>
            <LecturesView />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-course/:courseID/module/:moduleID/live-class/:liveclassID",
        element: (
          <ProtectedRoute userRoles={[USER_ROLES.student]}>
            <LiveclassView />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-courses",
        element: (
          <ProtectedRoute userRoles={[USER_ROLES.student]}>
            <MyCourses />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-course/:courseID",
        element: (
          <ProtectedRoute userRoles={[USER_ROLES.student]}>
            <MyCoursesView />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-ebooks",
        element: (
          <ProtectedRoute userRoles={[USER_ROLES.student]}>
            <MyEbooks />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <ProtectedRoute userRoles={[USER_ROLES.student]}>
            <MyOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "news/:newsID",
        element: <NewsView />,
      },
      {
        path: "my-course/:courseID/module/:moduleID/note/:noteID",
        element: (
          <ProtectedRoute userRoles={[USER_ROLES.student]}>
            <NotesView />
          </ProtectedRoute>
        ),
      },
      {
        path: "order/success",
        element: <OrderSuccess />,
      },
      {
        path: "product/:productID",
        element: <Product />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute userRoles={[USER_ROLES.student]}>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/:courseID/purchase",
        element: <Purchase />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "sslcommerz/:type",
        element: <SSLCommerz />,
      },
      {
  path: "paystation/:type/:type2",
  element: <PaymentVerify />,
},
      {
        path: "team",
        element: <TeamOditi />,
      },
      {
        path: "terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "today-oditi",
        element: <TodayOditi />,
      },
      {
        path: "why-oditi",
        element: (
          <h1 className="py-10 text-xl text-center">No content available</h1>
        ),
      },
    ],
  },
];
