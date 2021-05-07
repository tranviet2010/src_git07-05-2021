import { getListTrend } from "../service/products";
import { BEST_PRODUCT, POPULAR_PRODUCT, NEW_PRODUCT,ID_SHOP } from "./types";
import {getShopInfo} from "../service/products";
import { IDSHOP } from "../utils/asynStorage/store";

export const GetTrendProduct = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return getListTrend(data)
      .then((result) => {
        if (result.data.ERROR == "0000") {
          if (data.STT_TREND === 1) {
            dispatch({ type: POPULAR_PRODUCT, payload: result.data.INFO });
          } else if (data.STT_TREND === 2) {
            dispatch({ type: BEST_PRODUCT, payload: result.data.INFO });
          } else if (data.STT_TREND === 3) {
            dispatch({ type: NEW_PRODUCT, payload: result.data.INFO });
          }
        } else {
        }
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
