import { tagTypes } from "../tagTypes/tagTypes";
import baseApi from "./baseApi";

const PAYMENT_URL = "/payment";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create reservation endpoint
    createSession: build.mutation({
      query: (data) => ({
        url: `${PAYMENT_URL}/checkout`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.PAYMENT],
    }),

    // getAllReservation: build.query({
    //   query: () => ({
    //     url: `${RESERVATION_URL}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.RESERVATION],
    // }),
  }),
});

export const { useCreateSessionMutation } = paymentApi;
