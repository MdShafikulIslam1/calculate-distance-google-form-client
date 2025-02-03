import reservationReducer from "@/redux/feature/reservation/reservationSlice";
import routeReducer from "@/redux/feature/route/routeSlice";
import baseApi from "./api/baseApi";

const reducer = {
  route: routeReducer,
  reservation: reservationReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
export default reducer;
