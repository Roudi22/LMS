import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }), // process.env.NEXT_PUBLIC_API_URI is the base url for the api server
    endpoints: (builder) => ({}),
});

export const {} = apiSlice;
