import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import SearchPage from "../pages/search/page";
import CoursePage from "../pages/course/page";
import BookingPage from "../pages/booking/page";
import AllCoursesPage from '../pages/courses/page';

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/sok", element: <SearchPage /> },
  { path: "/alla-banor", element: <AllCoursesPage /> },
  { path: "/banor/:courseSlug", element: <CoursePage /> },
  { path: "/boka/:bookingId", element: <BookingPage /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
