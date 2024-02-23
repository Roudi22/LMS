import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userRegistration } from "./authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
}

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints here
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
              url: "register",
              method: "POST",
              body: data,
              credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
              try {
                const result = await queryFulfilled;
                dispatch(
                  userRegistration({
                    token: result.data.activationToken,
                  })
                );
              } catch (error: any) {
                console.log(error);
              }
            },
          }),
          activation: builder.mutation({
            query: ({ activation_token, activation_code }) => ({
              url: "activate-user",
              method: "POST",
              body: {
                activation_token,
                activation_code,
              },
            }),
          }),
          login: builder.mutation({
            query: ({ email, password }) => ({
              url: "login-user",
              method: "POST",
              body: {
                email,
                password,
              },
              credentials : "include" as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
              try {
                
                const result = await queryFulfilled;
                dispatch(
                  userLoggedIn({
                    accessToken: result.data.accessToken,
                    user: result.data.user
                  }) // dispatching the userLoggedIn action to update the state with the user's access token and user details
                );
                console.log("success from login mutation",result);
              } catch (error: any) {
                console.log("error from login mutation",error);
              }
            }
          })
    })
});

export const { useRegisterMutation, useActivationMutation, useLoginMutation} = authApi;