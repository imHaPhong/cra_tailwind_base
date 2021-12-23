import { configureStore } from '@reduxjs/toolkit';
// import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./pages/Auth/auth.slice"

const rootReducer = {
  auth: authReducer
}

const store = configureStore({
  reducer: rootReducer,
})
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch