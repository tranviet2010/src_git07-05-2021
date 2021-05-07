import api from "../api";

export const getDevice = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("update_device", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};