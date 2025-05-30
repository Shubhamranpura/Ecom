import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  mode: localStorage.getItem('theme') || "light"
};

const theameSlice = createSlice({
  name: "Theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
       localStorage.setItem('theme', state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload
      localStorage.setItem('theme', state.mode);

    }
  }
});

export  const {toggleTheme  , setTheme} = theameSlice.actions ; 
export default theameSlice.reducer;