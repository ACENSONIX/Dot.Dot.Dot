import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:4000'
});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer $(JSON.parse(localStorage.getItem('profile')).token)`;
    }
    return req;
} , (error) => {
    return Promise.reject(error);
} );

export const login = (authInfo) => API.post("/cafe/login", authInfo);
export const register = (authInfo) => API.post("/cafe/signup", authInfo);

