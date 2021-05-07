import api from "../api";
import qs from "qs";
export const getListOrder = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_order_history", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getListOrderStore = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_order_history_store_babu", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getDetailOrdered = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_order_history_detail", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const orderProduct = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("order_product3", data, {
        // paramsSerializer: (params) => {
        //   return qs.stringify(params, { arrayFormat: "repeat" });
        // },
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateOrder = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("edit_order_product", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateOrderShop = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("update_bill_order_shop", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getConfigCommission = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_config_commission", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getConfigcom = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_config1", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const listStores = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_order_history_detail_pd", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const GetListStore = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_list_store", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const GetProperties = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_properties", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
