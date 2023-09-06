/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/books/bookApi";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";

const UpdateBook = () => {
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({});
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationDate, setPublicationDate] = useState(null);

  interface INewBook {
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
  }
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleBookQuery(id);
  const [createBook, option] = useUpdateBookMutation();
  const navigate = useNavigate();
  useEffect(() => {
    setBook(data?.data);
    setLoading(isLoading);
    if (book) {
      setTitle(book?.title);
      setGenre(book?.genre);
      setPublicationDate(book?.publicationDate);
    }
  }, [data?.data, book]);
  const onChangeHandler = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    }
    if (e.target.name === "genre") {
      setGenre(e.target.value);
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedData = {
      title: title,
      genre: genre,
      publicationDate: publicationDate,
    };
    const option = {
      id: id,
      data: updatedData,
    };
    const result = await createBook(option);

    console.log(result);
    if (result?.data?.success) {
      toast.success("Book updated successfully");
      setLoading(false);
      navigate("/books");
    }
  };
  return (
    <LoadingOverlay active={loading}>
      <div className="w-[500px] mx-auto">
        <div className="w-full mx-auto max-w-sm p-4 mt-4 mb-8 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={onSubmitHandler}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Update a Book
            </h5>
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={onChangeHandler}
                value={title}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="genre"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                onChange={onChangeHandler}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={genre}
              >
                <option selected>Choose a Genre</option>
                <option value="programming">Programming</option>
                <option value="nature">Nature</option>
                <option value="travel">Travel</option>
                <option value="genarel">Grnarel</option>
                <option value="gossiping">Gossiping</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="publicastionDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Publication Date
              </label>
              <DatePicker
                id="publicastionDate"
                className="w-[320px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                selected={
                  publicationDate !== undefined
                    ? new Date(publicationDate)
                    : null
                }
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                onChange={(date) => {
                  if (data !== null) {
                    setPublicationDate(date?.toISOString().split("T")[0]);
                  } else {
                    setPublicationDate("");
                  }
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update Book
            </button>
          </form>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default UpdateBook;
