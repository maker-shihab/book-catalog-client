/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "flowbite";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { useAppDispatch } from "../redux/hook";
import { removeUser } from "../redux/user/userSlice";
const cookies = new Cookies();
const Navbar = () => {
  const [userName, setUserName] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setInterval(() => {
      setUserName(cookies.get("userName"));
    }, 500);
  }, []);

  const logOutHandler = () => {
    dispatch(removeUser());
    cookies.remove("userName", { path: "/" });
    cookies.remove("id", { path: "/" });
    cookies.remove("email", { path: "/" });
    toast.success("Log Out Success");
    navigate("/");
  };
  return (
    <div className="">
      <nav className="bg-[#fcf5ec] border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 py-6">
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#333]">
              Book Catalog
            </span>
          </Link>
          <div className="flex items-center md:order-2">
            <button
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <div className="relative inline-flex items-center justify-center w-10 h-10 p-4 overflow-hidden bg-gray-100 rounded-full  ring-2 ring-gray-300">
                <span className="font-medium text-xl text-gray-600">
                  {userName ? <>{userName.slice(0, 1)}</> : <></>}
                </span>
              </div>
            </button>
            {/* Dropdown menu  */}
            <div
              className="w-[200px] z-50 hidden my-4 text-base list-none divide-y bg-[#5b4eea] t[#fff] divide-gray-100 rounded-lg shadow"
              id="user-dropdown"
            >
              <ul className="py-2" aria-labelledby="user-menu-button">
                {!userName ? (
                  <>
                    <li>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm text-[#333] hover:bg-[#eeeeee57]"
                      >
                        Sign Up
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-[#333] hover:bg-[#eeeeee57]"
                      >
                        Login
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm text-[#333] hover:bg-[#eeeeee57]"
                      onClick={logOutHandler}
                    >
                      Log out
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 border-b-2 border-b-[#fcf5ec] md:bg-transparent md:p-0 text-[#5b4eea] md:hover:text-[#5b4eea]  md:focus:text-[#333] md:hover:border-b-[#EEEEEE] md:focus:border-b-[#EEEEEE] text-xl"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/books"
                  className="block py-2 pl-3 pr-4 border-b-2 border-b-[#fcf5ec] md:bg-transparent md:p-0 text-[#333] md:hover:text-[#5b4eea]  md:focus:text-[#333] md:hover:border-b-[#EEEEEE] md:focus:border-b-[#EEEEEE] text-xl"
                >
                  All Books
                </Link>
              </li>
              {userName ? (
                <>
                  <li>
                    <Link
                      to="/add-book"
                      className="block py-2 pl-3 pr-4 border-b-2 border-b-[#5b4eea] md:bg-transparent md:p-0 text-[#333] md:hover:text-[#333]  md:focus:text-[#333] md:hover:border-b-[#EEEEEE] md:focus:border-b-[#EEEEEE] text-xl"
                    >
                      Add a New Book
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/wishlist"
                      className="block py-2 pl-3 pr-4 border-b-2 border-b-[#5b4eea] md:bg-transparent md:p-0 text-[#ffffffb2] md:hover:text-[#333]  md:focus:text-[#333] md:hover:border-b-[#EEEEEE] md:focus:border-b-[#EEEEEE] text-xl"
                    >
                      Wishlist
                    </Link>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
