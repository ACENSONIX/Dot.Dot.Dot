import axios from 'axios'

const API = axios.create({
    baseURL: 'http://192.168.208.132:4000'
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
export const getProfile = (id) => API.get("/cafe/profile/:id");

export const addApplicant = (newApplicant) => API.post("/user/signup", newApplicant);
export const viewApplicant = (id) => API.get(`/user/profile/${id}`);
export const getApplicants = () => API.get("/user/profile");
export const verifyApplicant = (formData) => API.post("/user/search", formData);

export const flaggedApplicants = () => API.get("/user/flag");

export const getEmployees = (id) => API.get(`/user/employee/${id}`);

