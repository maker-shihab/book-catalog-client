/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateWishListMutation } from "../redux/wishList/wishListApi";

const BookCard = ({ book, userId }) => {
  const [createWishList, { isLoading, isError, isSuccess }] =
    useCreateWishListMutation();
  const createHandler = async (bookId: string) => {
    const data = {
      book: bookId,
      userId: userId,
    };
    const result = await createWishList(data);
    if (result?.data?.success) {
      toast.success("wishList created successfully");
    } else {
      toast.error("This Book is already in the list");
    }
  };
  return (
    <div>
      <div className="max-w-sm h-[400px] bg-white border border-gray-200 rounded-lg shadow">
        <Link to={`/book-details/${book._id}`} className="h-[150px]">
          <img
            className="rounded-t-lg w-[100%] h-[150px]"
            src="https://placehold.co/800x410"
            alt=""
          />
        </Link>
        <div className="h-[250px] flex flex-col justify-between p-5">
          <Link to={`/book-details/${book._id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {book.title}
            </h5>
          </Link>
          <div>
            <h1 className="text-xl">
              Author :{" "}
              <span className="font-semibold">
                {book?.author?.name?.firstName +
                  " " +
                  book?.author?.name?.lastName}
              </span>
            </h1>
            <div className=" text-sm mt-2">
              <p>Genre : {book.genre}</p>
              <p className="mt-2">Publication Date : {book?.publicationDate}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Link
              to={`/book-details/${book._id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
            {userId && (
              <Icon
                className="cursor-pointer"
                width="30px"
                color="#1a56db"
                icon="icon-park-solid:love-and-help"
                onClick={() => createHandler(book?._id)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
