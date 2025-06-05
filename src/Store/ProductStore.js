import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice"
import theameSlice from "./TheamSlice"


const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: theameSlice
  }
})

export default store