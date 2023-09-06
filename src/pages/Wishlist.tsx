/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import {
  useDeleteWishListMutation,
  useGetwishListsQuery,
} from "../redux/wishList/wishListApi";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";
import { useEffect, useState } from "react";
import DeleteAlert from "../components/DeleteAlert";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const userId = cookies.get("id");

const Wishlist = () => {
  const [loading, setLoading] = useState(true);
  const [wishLists, setWishLists] = useState([]);
  const { data, isLoading, error } = useGetwishListsQuery(undefined);
  const [deleteWishList, op] = useDeleteWishListMutation();
  useEffect(() => {
    if (data?.data) {
      const listTemp = data?.data.filter((item) => item?.userId === userId);
      console.log(listTemp);
      setWishLists(listTemp);
      if (!isLoading) {
        setLoading(false);
      }
    }
  }, [data?.data]);

  const onDeleteHandler = (id) => {
    DeleteAlert(() => handleDelete(id));
  };
  const handleDelete = async (id) => {
    setLoading(true);
    const result = await deleteWishList(id);
    if (result?.data?.success) {
      toast.success("WishList deleted successfully");
      setLoading(false);
    }
  };
  return (
    <LoadingOverlay active={loading}>
      <div className="max-w-5xl mx-auto relative ">
        <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start overflow-y-scroll top-16 h-[calc(100vh-80px)]">
          <div className="w-[70%] h-[100%] mx-auto">
            <h1 className="my-6 text-3xl font-semibold">While List Books</h1>
            <div>
              {wishLists?.map((item, index) => (
                <div className="w-[60%] flex justify-evenly items-center rounded-md shadow-lg my-4">
                  <Link to={`/book-details/${item?.book?._id}`}>
                    <img
                      className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                      src="https://i.ibb.co/4K8FGRS/R.jpg"
                      alt=""
                    />
                  </Link>
                  <Link to={`/book-details/${item?.book?._id}`}>
                    <div className=" p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {item?.book?.title}
                      </h5>
                      <p className="mb-3 font-normal text-gray-700">
                        {/* {item?.book?.author?.userName} */}
                        Mohon
                      </p>
                    </div>
                  </Link>

                  <div>
                    <Icon
                      className="cursor-pointer"
                      icon="ic:baseline-delete"
                      width={32}
                      color="red"
                      onClick={() => onDeleteHandler(item._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default Wishlist;
