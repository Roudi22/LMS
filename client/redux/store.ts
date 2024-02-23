"use client"
import { configureStore} from "@reduxjs/toolkit"
import { apiSlice } from "./features/api/apiSlice"
import authSlice from "./features/auth/authSlice"
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false,

})

// call the refresh token query to get a new access token
const initializeApp = async () => {
    await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, {forceRefetch: true}))
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, {forceRefetch: true})) // load user data from the server and update the state with the user's details if the user is logged in 
}
initializeApp()