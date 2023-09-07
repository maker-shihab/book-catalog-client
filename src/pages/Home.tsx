import banner from "../assets/banner.svg";
import Features from "../layouts/Features";
import "../styles/banner.css";

const Home = () => {
  return (
    <section className="banner">
      <div className="container">
        <div className="mx-auto ">
          <div className="banner__content">
            <div className="banner__text">
              <h1 className="text-5xl font-bold text-primary mb-4">
                Welcome to Our <br /> Book Catalog
              </h1>
              <p className=" text-secondary font-semibold text-xl">
                Discover Your Next Favorite Book
              </p>
              <div className="text-primary my-5 max-w-md">
                <p>
                  Explore a wide range of genres and authors, and find the
                  perfect book to immerse yourself in. Whether you're a
                  passionate reader or just starting your reading journey, we
                  have something for everyone.
                </p>
              </div>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-xl rounded-lg px-5 py-2.5 text-center mr-2 mb-2 mt-4"
              >
                Learn More...
              </button>
            </div>
            <div className="banner__illustration">
              <img className="mx-auto" src={banner} alt="" />
            </div>
          </div>
          <Features />
        </div>
      </div>
    </section>
  );
};

export default Home;
