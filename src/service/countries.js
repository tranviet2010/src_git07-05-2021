import api from "../api";

export const GetCity = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_city", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const GetDistrict = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_district", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const GetDistrictChild = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_ward", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
