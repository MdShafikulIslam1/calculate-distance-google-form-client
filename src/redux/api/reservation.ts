import { tagTypes } from "../tagTypes/tagTypes";
import baseApi from "./baseApi";

const RESERVATION_URL = "/reservation";

const reservationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create reservation endpoint
    createReservation: build.mutation({
      query: (data) => ({
        url: `${RESERVATION_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.RESERVATION],
    }),

    getAllReservation: build.query({
      query: () => ({
        url: `${RESERVATION_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.RESERVATION],
    }),
  }),
});

export const { useCreateReservationMutation, useGetAllReservationQuery } =
  reservationApi;
