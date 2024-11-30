import { configureStore } from "@reduxjs/toolkit";
import MovieoReducer from "./MovieoSlice";

export default configureStore({
  reducer: {
    MovieoData: MovieoReducer,
  },
});
