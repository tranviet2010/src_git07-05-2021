import { Login, updateDevice, getProfile } from "../service/auth";
import {getShopInfo} from "../service/products";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT,ID_SHOP } from "./types";
import { _retrieveData, _storeData } from "../utils/asynStorage";
import { TOKEN, AUTH, USER_NAME,PASSWORD,IDSHOP } from "../utils/asynStorage/store";

export const LoginPhone = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return Login(data)
      .then((result) => {
        console.log("login +++",result)
        if (result.data.ERROR === "0000") {
          Promise.all([_storeData(TOKEN, result.data.TOKEN)]);
          Promise.all([_storeData(USER_NAME, result.data.USERNAME)]);
          Promise.all([_storeData(PASSWORD,result.data.PASSWORD)]);
          Promise.all([_storeData(PASSWORD,result.data.PASSWORD)]);
          dispatch({ type: LOGIN_SUCCESS, payload: result.data });
        } else {
          dispatch({ type: LOGIN_FAIL });
        }
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const GetIdShop = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return getShopInfo(data)
      .then((result) => {
        console.log("result_getshop",result)
        if (result.data.ERROR === "0000") {
          console.log('result.data.USER_CODE',result.data.USER_CODE)
          _storeData(IDSHOP,result.data.USER_CODE).then(()=>{
            dispatch({ type: ID_SHOP, payload: result.data });
          })
        } else {
          console.log("errr");
        }
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const UpdateDivice = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return updateDevice(data)
      .then((result) => {
        if (result.data.ERROR == "0000") {
          Promise.all([_storeData(AUTH, result.data)]);
          dispatch({ type: LOGIN_SUCCESS, payload: result.data });
        } else {
          dispatch({ type: LOGIN_FAIL });
        }
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const GetProfile = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return getProfile(data)
      .then((result) => {
        if (result.data.ERROR == "0000") {
          Promise.all([_storeData(TOKEN, result.data.TOKEN)]);
          dispatch({ type: LOGIN_SUCCESS, payload: result.data });
        } else {
          dispatch({ type: LOGIN_FAIL });
        }
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const LogOut = (data) => (dispatch) => {
  return dispatch({ type: LOG_OUT });
};