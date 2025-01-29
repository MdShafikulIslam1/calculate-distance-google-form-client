import routeReducer from "@/redux/feature/route/routeSlice";
import baseApi from "./api/baseApi";

const reducer = {
  route: routeReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
export default reducer;
