import api from "../api";

export const getText = (data) => {
    return new Promise((resolve, reject) => {
        return api
            .post("marketplace/get_marketplaces", data)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
};


export const GetProduct = (data) => {
    return new Promise((resolve, reject) => {
        return api
            .post("marketplace/get_product_type", data)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

export const UpdateProduct = (data) => {
    return new Promise((resolve, reject) => {
        return api
            .post("marketplace/update_marketplace", data)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

export const DeleteProduct = (data) => {
    return new Promise((resolve, reject) => {
        return api
            .post("marketplace/delete_marketplace", data)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

export const LikeProduct = (data) => {
    return new Promise((resolve, reject) => {
        return api
            .post("marketplace/update_like", data)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

export const getComment = (data) => {
    return new Promise((resolve, reject) => {
        return api
            .post("marketplace/get_comments", data)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

export const comment = (data) => {
    return new Promise((resolve, reject) => {
        return api
            .post("marketplace/update_comment", data)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

export const deleteCom = (data) => {
    return new Promise((resolve, reject) => {
        return api
            .post("marketplace/delete_comment", data)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};
