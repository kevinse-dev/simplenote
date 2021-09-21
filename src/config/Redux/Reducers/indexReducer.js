import popupReducer from "./popupReducer";
import { combineReducers } from "redux";

const Reducer = combineReducers({
  popup: popupReducer,
});

export default Reducer;
