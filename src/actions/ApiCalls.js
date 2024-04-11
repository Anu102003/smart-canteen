import axios from 'axios';

const API_BASE_URL = 'http://localhost:8180/';

const baseApi = axios.create({
    baseURL: API_BASE_URL,
});

export const loginApi = (data) => {
    // console.log(data)
    return baseApi.post(`/login`, data)
        .then(response => {
            // console.log(response);
            return response;
        })
        .catch(error => {
            console.log('Failed to login ', error);
            throw error; 
        });
};

export const registerApi = (data) => {
    // console.log(data)
    return baseApi.post(`/add`, data)
        .then(response => {
            // console.log(response);
            return response;
        })
        .catch(error => {
            console.log('Failed to register', error);
            throw error; 
        });
};

export const getAllProductsApi = () => {
    return baseApi.get(`/get/foods`,)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log('Failed to get Product', error);
            throw error; 
        });
};

export const getProductsByCategoryApi = (category) => {
    return baseApi.get(`/food/${category}`,)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log('Failed to get by category Product', error);
            throw error; 
        });
};

export const addProductsApi = (data) => {
    // console.log(data)
    return baseApi.post(`/add/food`, data)
        .then(response => {
            // console.log(response);
            return response;
        })
        .catch(error => {
            console.log('Failed to add Product', error);
            throw error; 
        });
};

export const updateProductsApi = (id,data) => {
    // console.log(id)
    return baseApi.put(`/food/${id}`,data)
        .then(response => {
            // console.log(response);
            return response;
        })
        .catch(error => {
            console.log('Failed to update Product', error);
            throw error; 
        });
};

export const deleteProductsApi = (id) => {
    // console.log(id)
    return baseApi.delete(`/delete/${id}`)
        .then(response => {
            // console.log(response);
            return response;
        })
        .catch(error => {
            console.log('Failed to delete Product', error);
            throw error; 
        });
};

export const getAllOrdersApi = () => {
    return baseApi.get(`/get/orders`,)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log('Failed to get Product', error);
            throw error; 
        });
};

export const getSingleProductApi = (id) => {
    return baseApi.get(`/get/food/${id}`,)
        .then(response => {
            // console.log(response)
            return response.data;
        })
        .catch(error => {
            console.log('Failed to get Product', error);
            throw error; 
        });
};

export const addOrderApi = (data) => {
    return baseApi.post(`/order`,data)
        .then(response => {
            // console.log(response)
            return response.data;
        })
        .catch(error => {
            console.log('Failed to add order', error);
            throw error; 
        });
};

export const orderApi = (email) => {
    return baseApi.get(`/order/${email}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log('Failed to add order', error);
            throw error; 
        });
};

export const profileApi = (email) => {
    return baseApi.get(`/user/${email}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log('Failed to get profile details', error);
            throw error; 
        });
};