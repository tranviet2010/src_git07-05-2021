import AsyncStorage from "@react-native-async-storage/async-storage";
import { CART, DATAITEM } from "../../utils/asynStorage/store";

export const _storeData = (field, value) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(field, JSON.stringify(value))
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const _retrieveData = async (field) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(field)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const _removeData = (field) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem(field)
      .then(() => {
      })
      .catch((error) => {
      });
  });
};

export const _getData = async () => {
  var list = await _retrieveData(DATAITEM);
  let cart = JSON.parse(list);
  return cart;
};


