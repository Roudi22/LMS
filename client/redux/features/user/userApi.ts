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
        editProfile: build.mutation({
        query: ({name}) => ({
            url: "update-user-info",
            method: "PUT",
            body: {name},
            credentials: "include",
        }),
        }),
        updatePassword: build.mutation({
            query: ({oldPassword, newPassword}) => ({
                url: "update-user-password",
                method: "PUT",
                body: {oldPassword, newPassword},
                credentials: "include",
            }),
            }),
    })
})

export const { useUpdateAvatarMutation, useEditProfileMutation, useUpdatePasswordMutation } = userApi;