import LatestSalesBook from "../assets/rare.png";
import HomeBookCard from "../components/HomeBookCard";
import "../styles/features.css";

export default function Features() {
  return (
    <section className="feature">
      <div className="mb-4">
        <h1 className="text-3xl text-center font-semibold m-0 pb-4">
          Explore the Newest 10 Books Here
        </h1>
        <hr className="w-[320px] mx-auto border-2 border-[#0F15A2]" />

        <div className="pt-4">
          <HomeBookCard />
        </div>
      </div>
      <div className="feature_area">
        <div className="feature_illustration">
          <img src={LatestSalesBook} className="w-[100%] rounded-lg" alt="" />
        </div>
        <div className="feature_text">
          <h1 className=" text-5xl font-semibold">
            High-Value Transactions: April to June 2023
          </h1>
          <p className="text-lg font-semibold my-4">
            Our selection includes beautifully illustrated books, signed copies,
            unique autographed items, original artworks, a captivating
            manuscript, and an exceptional rare facsimile
          </p>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative text-lg px-10 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              See List
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
