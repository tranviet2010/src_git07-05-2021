import {
  REMOVE_ALL_TO_CART,
  ADD_TO_CART,
  REMOVE_TO_CART,
} from "../action/types";
import { _storeData, _retrieveData, _getData } from '../utils/asynStorage'
import { CART, DATAITEM } from "../utils/asynStorage/store";
// import { Name } from "./storeLocal";



var INIT_STATE = {
  listItem: [],
  data: [],
};

// var Name = async (INIT_STATE) => {
//   var dataCart = await _retrieveData(DATAITEM);
//   var cart = JSON.parse(dataCart);
//   return INIT_STATE.listItem=cart; 
// }
// window.onload= Name(INIT_STATE);

// console.log("abcccbbcb",INIT_STATE.listItem)


function search(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].CODE_PRODUCT === nameKey.CODE_PRODUCT) {
      return false;
    }
  }
  return true;
}
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case REMOVE_ALL_TO_CART: {
      _storeData(DATAITEM, [])
      return {
        ...state,
        listItem: [],
      };
    }
    case ADD_TO_CART: {
      console.log("action.payload", action.payload)
      let { cart: oldCart, data } = action.payload;
      console.log({ oldCart })
      if (!data) {
        return { ...state, listItem: oldCart }
      }
      if (!oldCart) {
        oldCart = []
      }
      if (search(data, oldCart) == false) {
        console.log('errrrrr', oldCart)
        return {
          ...state,
          listItem: oldCart,
        };

      } else
        console.log('data=====', oldCart, action.payload)
      _storeData(DATAITEM, [...oldCart, data])
      // console.log("hí getData", getData)
      return {
        ...state,
        listItem: [...oldCart, data],
      };
    }
    case REMOVE_TO_CART: {
      const list=action.payload;
      console.log({list})
      return {
        ...state,
        listItem: list
      };
    }
    default:
      return { ...state };
  }
};
