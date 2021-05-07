import { act } from "react-test-renderer";
import { ACCOUNT_NOTIFY,SEARCH_HOME,SEARCH_ORDER, SEARCH_PRODUCT } from "../action/types";

const INIT_STATE = {
  countNotify: 0,
  searchorder:'',
  searchhome:'',
  searchproduct:'',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACCOUNT_NOTIFY: {
      return {
        ...state,
        countNotify: action.payload,
      };
    }
    case SEARCH_ORDER:{
      return {
        searchorder:action.payload,
          
      }
    }
    case SEARCH_HOME:{
      return {
        searchhome:action.payload
      } 
    }
    case SEARCH_PRODUCT:{
      return {
        searchproduct:action.payload
      }
    }
    default:
      return { ...state };
  }
};
