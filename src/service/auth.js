import api from "../api";

export const Login = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("login", data)
      .then((result) => {
        console.log("Login", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const updateDevice = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("check_device", data)
      .then((result) => {
        console.log("Login token", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const getIdShop = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("login1", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const regUser = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("reg_user", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const withDrawal = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_request_withdrawal", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const resetPass = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("reset_pass_ctv", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const changePass = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("reset_pass", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};