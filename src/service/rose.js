import api from "../api";

export const GetCTVDetail = (data) => {
    return new Promise((resolve, reject) => {
      return api
        .post("get_info_ctv_detail", data)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const Getwithdrawal = (data) => {
    return new Promise((resolve, reject) => {
      return api
        .post("get_withdrawal_history", data)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  export const GetwithdrawalCTV = (data) => {
    return new Promise((resolve, reject) => {
      return api
        .post("get_withdrawal", data)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
