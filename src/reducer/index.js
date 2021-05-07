import { combineReducers } from "redux";
import authorReducer from "./authorReducer";
import orderReducer from "./orderReducer";
import notifyReducer from "./notifyReducer";
import productReducer from "./productReducer";

const reducers = combineReducers({
  authUser: authorReducer,
  order: orderReducer,
  notify: notifyReducer,
  product: productReducer,
});
export default reducers;
