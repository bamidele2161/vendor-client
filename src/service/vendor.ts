import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
import Cookies from "js-cookie";

// TypeScript interfaces for vendor bank details
export interface VendorBankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface VendorBankDetailsResponse {
  message: string;
  data: {
    id: number;
    vendorId: number;
    bankName: string;
    accountName: string;
    accountNumber: string;
    createdAt: string;
    updatedAt: string;
  };
}

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseResult = await fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const userToken = Cookies.get("ashoboxToken");
      if (userToken) {
        headers.set("Authorization", `Bearer ${userToken}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

  return baseResult;
};

export const vendorApi = createApi({
  reducerPath: "vendorApi",
  baseQuery: customBaseQuery,
  tagTypes: ["VendorBankDetails"],
  endpoints: (builder) => ({
    // GET /vendor-bank-details/{vendorId}
    getVendorBankDetails: builder.query<VendorBankDetailsResponse, number>({
      query: (vendorId) => `/vendor-bank-details/${vendorId}`,
      providesTags: [{ type: "VendorBankDetails", id: "LIST" }],
    }),

    // PUT /vendor-bank-details/{vendorId}
    updateVendorBankDetails: builder.mutation<
      VendorBankDetailsResponse,
      { vendorId: number; body: VendorBankDetails }
    >({
      query: ({ vendorId, body }) => ({
        url: `/vendor-bank-details/${vendorId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "VendorBankDetails", id: "LIST" }],
    }),

    // DELETE /vendor-bank-details/{vendorId}
    deleteVendorBankDetails: builder.mutation<void, number>({
      query: (vendorId) => ({
        url: `/vendor-bank-details/${vendorId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "VendorBankDetails", id: "LIST" }],
    }),
  }),
});

export const {
  useGetVendorBankDetailsQuery,
  useUpdateVendorBankDetailsMutation,
  useDeleteVendorBankDetailsMutation,
} = vendorApi;
