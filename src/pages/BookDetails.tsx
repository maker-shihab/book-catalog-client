/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Link, useNavigate, useParams } from "react-router-dom";
import defaltImage from "../assets/no-image.jpeg";
import {
  useBookReviewMutation,
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "../redux/books/bookApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";
import Cookies from "universal-cookie";
import DeleteAlert from "../components/DeleteAlert";
const cookies = new Cookies();

const BookDetails = () => {
  const [bookDetails, setBookDetails] = useState({});
  const [userReview, serUserReview] = useState("");
  const [userId, setUserId] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 1000,
  });
  const [bookReview, options] = useBookReviewMutation();
  const [deleteBook, op] = useDeleteBookMutation();

  useEffect(() => {
    setInterval(() => {
      setUserId(cookies.get("id"));
    }, 500);
    setBookDetails(data?.data);
  }, [data?.data]);

  const onReviewHandler = async (e) => {
    e.preventDefault();
    const option = {
      id: id,
      data: { reviews: userReview },
    };
    const result = await bookReview(option);
    if (result?.data?.success) {
      toast.success("Book Review Success!");
    }
    e.target.reset();
  };

  const onDeleteHandler = (id) => {
    DeleteAlert(() => handleDelete(id));
  };
  const handleDelete = async (id) => {
    const result = await deleteBook(id);
    if (result?.data?.success) {
      toast.success("Book delete Success!");
      navigate("/books");
    }
  };

  return (
    <LoadingOverlay active={isLoading}>
      <div className="w-[80%] mx-auto my-8">
        <div className="flex items-center ">
          <div className="w-[50%]">
            <img className="w-[70%]" src={defaltImage} alt="" />
          </div>
          <div>
            <h1 className="text-5xl font-semibold">{bookDetails?.title}</h1>
            <div className="my-5">
              <h1 className="text-2xl">
                Author :{" "}
                {bookDetails?.author?.name?.firstName +
                  " " +
                  bookDetails?.author?.name?.lastName}
              </h1>
              <h1 className="text-2xl">Genre : {bookDetails?.genre}</h1>
              <h1 className="text-2xl">
                Publication Date : {bookDetails?.publicationDate}
              </h1>
            </div>
            {bookDetails?.author?._id === userId ? (
              <div>
                <Link to={`/update/${bookDetails?._id}`}>
                  <button
                    type="button"
                    className="text-white px-8 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm py-2.5 text-center mr-2 mb-2"
                  >
                    Edit
                  </button>
                </Link>

                <button
                  type="button"
                  className="text-white px-8 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm py-2.5 text-center mr-2 mb-2"
                  onClick={() => onDeleteHandler(bookDetails?._id)}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div className="mt-8">
          {userId && (
            <form onSubmit={onReviewHandler}>
              <label htmlFor="chat" className="sr-only">
                Your message
              </label>
              <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                <textarea
                  id="chat"
                  rows="1"
                  className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => serUserReview(e.target.value)}
                  placeholder="Your message..."
                ></textarea>
                <button
                  type="submit"
                  className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                >
                  <svg
                    className="w-5 h-5 rotate-90"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                  </svg>
                  <span className="sr-only">Send message</span>
                </button>
              </div>
            </form>
          )}

          <div className="mt-16">
            <h1 className="text-2xl font-semibold">
              Users reviews for this Book
            </h1>
            <div className="my-4">
              {bookDetails?.reviews?.map((review, index) => (
                <div className="flex items-center my-4" key={index}>
                  <div className="relative w-10 h-10 mr-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg
                      className="absolute w-12 h-12 text-gray-400 -left-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <p>{review}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default BookDetails;
