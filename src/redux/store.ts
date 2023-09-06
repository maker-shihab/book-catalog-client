import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./features/cart/cartSlice";
import bookReducer from "../redux/books/bookSlice";
import { api } from "./api/apiSlice";
import userReducer from "../redux/user/userSlice";

const store = configureStore({
  reducer: {
    book: bookReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
