import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Books from "../pages/Books";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import BookDetails from "../pages/BookDetails";
import PrivateRoute from "./PrivateRoute";
import AddBook from "../pages/AddBook";
import UpdateBook from "../pages/UpdateBook";
import Wishlist from "../pages/Wishlist";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },

      {
        path: "/book-details/:id",
        element: <BookDetails />,
      },
      {
        path: "/add-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/update/:id",
        element: <UpdateBook />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
