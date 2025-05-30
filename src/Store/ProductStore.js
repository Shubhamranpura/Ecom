import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice"
import theameSlice from "./TheameSlice"


const store = configureStore({
  reducer:{
    cart: cartReducer,
    theme : theameSlice
  }
})

export default store