/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
const cookies = new Cookies();

interface IUserState {
  user: {
    userName: string | null;
    email: string | null;
    _id: string | null;
    accessToken: string | null;
    refreshToken: string | null;
  };
}

const initialState: IUserState = {
  user: {
    userName: null,
    email: null,
    _id: null,
    accessToken: null,
    refreshToken: null,
  },
};

const userSlice = createSlice({
  name: "user ",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const userData = action?.payload;
      cookies.set("userName", userData.userName, { path: "/" });
      cookies.set("id", userData._id, { path: "/" });
      cookies.set("email", userData.email, { path: "/" });
      state.user = action?.payload;
    },
    removeUser: (state) => {
      state.user = {
        userName: null,
        email: null,
        _id: null,
        accessToken: null,
        refreshToken: null,
      };
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
