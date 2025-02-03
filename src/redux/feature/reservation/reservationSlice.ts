import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define TypeScript type based on provided data structure
interface ReservationState {
  apartmentOffice: string;
  city: string;
  companyName: string;
  country: string;
  email: string;
  firstName: string;
  flightOrTrain: string;
  lastName: string;
  orderNotes: string;
  phone: string;
  postalCode: string;
  streetAddress: string;
  termsAndCondition: boolean;
}

// Initial state with default values
const initialState: ReservationState = {
  apartmentOffice: "",
  city: "",
  companyName: "",
  country: "",
  email: "",
  firstName: "",
  flightOrTrain: "",
  lastName: "",
  orderNotes: "",
  phone: "",
  postalCode: "",
  streetAddress: "",
  termsAndCondition: false,
};

// Create Redux Slice
const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setReservation: (state, action: PayloadAction<ReservationState>) => {
      return action.payload;
    },
    updateReservation: (
      state,
      action: PayloadAction<Partial<ReservationState>>
    ) => {
      return { ...state, ...action.payload };
    },
    resetReservation: () => initialState,
  },
});

// Export actions and reducer
export const { setReservation, updateReservation, resetReservation } =
  reservationSlice.actions;
export default reservationSlice.reducer;
