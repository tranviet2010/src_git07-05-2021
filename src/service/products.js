import api from "../api";

export const getListProducts = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_product_cat2", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getListProduct1 = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_product_cat", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getListProductDetails = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_product_cat_detail", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getListSubProducts = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_sub_product", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}; //unsing

export const getProductCatDetail = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_product_cat_detail", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}; 

export const getShopInfo = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("getshopinfo", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}; 


export const getListSubChildProducts = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_sub_product_child", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getListDetailChildProducts = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_product_cat_detail", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getListTrend = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_product_trend", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getDetails = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_product_detail", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getParentsItem = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_product_cat2", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getListStore = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("Get_Store_Codeproduct", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const syncstatusStore = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("Update_syncstatus_Store", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addProductCategory = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("new_product_category", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateProductCategory = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("edit_product_category", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteProductCategory = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("del_product_category", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
