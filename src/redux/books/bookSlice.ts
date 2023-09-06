import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IBookFilter {
  searchTerm: string | null;
  genre: string | null;
  publicationYear: number | null;
}

const initialState: IBookFilter = {
  searchTerm: "",
  genre: "",
  publicationYear: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPublicationYear: (state, action: PayloadAction<number>) => {
      state.publicationYear = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
  },
});

export const { setSearchTerm, setPublicationYear, setGenre } =
  bookSlice.actions;

export default bookSlice.reducer;
