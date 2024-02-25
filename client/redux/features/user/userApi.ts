import { apiSlice } from "../api/apiSlice";


export const userApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        updateAvatar: build.mutation({
        query: (avatar) => ({
            url: "update-user-avatar",
            method: "PUT",
            body: {avatar},
            credentials: "include",
        }),
        }),
    })
})

export const { useUpdateAvatarMutation } = userApi;