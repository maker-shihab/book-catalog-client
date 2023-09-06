import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  useGetBooksQuery,
  useGetLatestBooksQuery,
} from "../redux/books/bookApi";
import cardImage from "../assets/no-image.jpeg";

const HomeBookCard = () => {
  const [latesBooks, setLatestBooks] = useState([]);
  const { data, isLoading, error } = useGetLatestBooksQuery(undefined);

  useEffect(() => {
    if (data?.data) {
      setLatestBooks(data?.data);
    }
  }, [data?.data]);
  return (
    <div className="my-8">
      {isLoading ? (
        <div
          role="status"
          className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
        >
          <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="w-full">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <Slider
          slidesToShow={2}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={1500}
          pauseOnFocus={false}
          pauseOnHover={false}
        >
          {latesBooks?.map((item, index) => (
            <Link
              to="/"
              className=" bg-white border border-gray-200 rounded-lg shadow  md:max-w-xl hover:bg-gray-100"
            >
              <div className="flex py-2">
                <img
                  className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={cardImage}
                  alt=""
                />
                <div className=" p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {item?.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700">
                    Author : {item?.author?.userName}
                  </p>
                  <p className="mb-3 font-normal text-gray-700">
                    Publication Date : {item?.publicationDate}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HomeBookCard;
