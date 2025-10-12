import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
import Cookies from "js-cookie";

// TypeScript interfaces
export interface VendorBankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface VendorBankDetailsResponse {
  message: string;
  data: VendorBankDetails;
}

export interface PayoutData {
  id: number;
  reference: string;
  recipientId: number;
  recipientType: string;
  amount: number;
  status: string;
  providerRef: string | null;
  initiatedBy: number;
  initiatedAt: string;
  receiptUrl: string | null;
  notes: string | null;
  createdAt: string;
}

export interface PayoutResponse {
  message: string;
  data: PayoutData[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface VendorReportData {
  id: number;
  businessName: string;
  status: string;
  totalOrders: number;
  totalRevenue: number;
  totalEarnings: number;
  createdAt: string;
}

export interface VendorReportsResponse {
  message: string;
  data: {
    vendors: VendorReportData[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
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
    getVendorBankDetails: builder.query<VendorBankDetailsResponse, string>({
      query: (vendorId) => `vendor-bank-details/${vendorId}`,
    }),
    updateVendorBankDetails: builder.mutation<VendorBankDetailsResponse, { vendorId: string; bankDetails: VendorBankDetails }>({
      query: ({ vendorId, bankDetails }) => ({
        url: `vendor-bank-details/${vendorId}`,
        method: 'PUT',
        body: bankDetails,
      }),
    }),
    deleteVendorBankDetails: builder.mutation<{ message: string }, string>({
      query: (vendorId) => ({
        url: `vendor-bank-details/${vendorId}`,
        method: 'DELETE',
      }),
    }),
    getVendorPayouts: builder.query<PayoutResponse, { vendorId: string; page?: number; limit?: number }>({
      query: ({ vendorId, page = 1, limit = 50 }) => `payouts/vendor/${vendorId}?page=${page}&limit=${limit}`,
    }),
    getVendorReports: builder.query<VendorReportsResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 50 } = {}) => `reports/vendors?page=${page}&limit=${limit}`,
    }),
  }),
});

export const {
  useGetVendorBankDetailsQuery,
  useUpdateVendorBankDetailsMutation,
  useDeleteVendorBankDetailsMutation,
  useGetVendorPayoutsQuery,
  useGetVendorReportsQuery,
} = vendorApi;
