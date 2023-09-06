/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Link, useNavigate } from "react-router-dom";
import login from "../assets/login.png";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../redux/user/userApi";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/user/userSlice";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";
import { toast } from "react-toastify";
const Login = () => {
  interface ILogin {
    userName: string;
    password: string;
  }
  const { register, handleSubmit } = useForm<ILogin>();
  const [loginUser, { isLoading, isError, isSuccess }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  if (isSuccess) {
    navigate("/");
  }
  const onSubmitHandler = async (data: ILogin) => {
    const result = await loginUser({
      userName: data.userName,
      password: data.password,
    });
    if (result?.data.success) {
      dispatch(setUser(result.data.data));
      toast.success("User Login Success");
    }
  };
  return (
    <LoadingOverlay active={isLoading}>
      <div className="flex items-center">
        <div>
          <img src={login} className="w-[90%]" alt="" />
        </div>
        <div className="w-full max-w-sm p-4 ml-16 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="space-y-6"
            action="#"
          >
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Login to Book Catalog
            </h5>
            <div>
              <label
                htmlFor="userName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                UserName
              </label>
              <input
                type="text"
                id="userName"
                {...register("userName", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                {...register("password", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login to your account
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <Link
                to="/signup"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default Login;
