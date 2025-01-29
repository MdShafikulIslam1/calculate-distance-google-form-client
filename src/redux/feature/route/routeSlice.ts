import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define TypeScript type based on the Prisma Route model
interface RouteState {
  departureAddress: string;
  arrivalAddress: string;
  vehicle: string;
  passenger: number;
  baggage: number;
  tripType: string;
  departureDate: string;
  returnTime?: string;
  travelTime: number;
  formatTravelTime: string;
  distance: number;
  formatDistance: string;
  price: number;
}

// Initial state with default values
const initialState: RouteState = {
  departureAddress: "",
  arrivalAddress: "",
  vehicle: "",
  passenger: 0,
  baggage: 0,
  tripType: "One Way",
  departureDate: "",
  returnTime: undefined,
  travelTime: 0,
  formatTravelTime: "",
  distance: 0,
  formatDistance: "",
  price: 0,
};

// Create Redux Slice
const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<RouteState>) => {
      return action.payload;
    },
    updateRoute: (state, action: PayloadAction<Partial<RouteState>>) => {
      return { ...state, ...action.payload };
    },
    resetRoute: () => initialState,
  },
});

// Export actions and reducer
export const { setRoute, updateRoute, resetRoute } = routeSlice.actions;
export default routeSlice.reducer;
