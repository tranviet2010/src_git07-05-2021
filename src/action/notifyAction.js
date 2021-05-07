import { ACCOUNT_NOTIFY,SEARCH_ORDER,SEARCH_HOME,SEARCH_PRODUCT } from "./types";

export const countNotify = (text) => (dispatch) => {
  return dispatch({ type: ACCOUNT_NOTIFY, payload: text });
};
export const searchOrder =(text)=>(dispatch)=>{
  return dispatch({type:SEARCH_ORDER,payload:text});
}
export const searchHome =(text)=>(dispatch)=>{
  return dispatch({type:SEARCH_HOME,payload:text});
}
export const searchProduct=(text)=>(dispatch)=>{
  return dispatch({type:SEARCH_PRODUCT,payload:text});
}