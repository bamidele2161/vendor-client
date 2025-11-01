import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  tagTypes: ["Auth", "Vendor"],

  endpoints: (builder) => ({
    //login
    login: builder.mutation<
      any,
      {
        emailOrPhoneNumber: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),

    //register
    registerVendor: builder.mutation<
      any,
      {
        email: string;
        password: string;
        fullName: string;
        address: string;
        businessName: string;
      }
    >({
      query: (body) => ({
        url: "/vendors",
        method: "POST",
        body,
      }),
    }),

    // Add the new Google auth endpoint
    googleAuth: builder.mutation({
      query: (data) => ({
        url: "/users/google",
        method: "POST",
        body: data,
      }),
    }),

    // Password reset endpoints
    requestPasswordReset: builder.mutation<
      any,
      {
        email: string;
      }
    >({
      query: (body) => ({
        url: "/users/request-password-reset",
        method: "POST",
        body,
      }),
    }),

    verifyOtp: builder.mutation<
      { resetToken: string },
      {
        email: string;
        otp: string;
      }
    >({
      query: (body) => ({
        url: "/users/verify-otp",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation<
      any,
      {
        resetToken: string;
        newPassword: string;
      }
    >({
      query: (body) => ({
        url: "/users/reset-password",
        method: "POST",
        body,
      }),
    }),

    getAllUsers: builder.query<any, void>({
      query: () => `/users`,
      providesTags: [{ type: "Auth", id: "Auth" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterVendorMutation,
  useGoogleAuthMutation,
  useRequestPasswordResetMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useGetAllUsersQuery,
} = authApi;
