import api from "../api";

export const getListNotify = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_list_notify", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateNotify = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("update_notify", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


export const getBanner = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_advertisement", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};