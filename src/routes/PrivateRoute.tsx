/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const userName = cookies.get("userName");
  const email = cookies.get("email");

  const { pathname } = useLocation();

  if (!email && !userName) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
}
