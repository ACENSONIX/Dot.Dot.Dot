import { LOGIN, LOGOUT, REGISTER, VIEW_PROFILE } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const login = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.login(formData);
        dispatch({ type: LOGIN, data });
        router("/dashboard/app");
    } catch (error) {
        console.log(error);
    }
};

export const register = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.register(formData);
        dispatch({ type: REGISTER, data });
        router("/dashboard/app");
    } catch (error) {
        console.log(error);
    }
}

export const logout = (router) => (dispatch) => {
    try {
        dispatch({ type: LOGOUT });
        router("/login");
    } catch (error) {
        console.log(error);
    }
}

export const getProfile = (id) => async (dispatch) => {
    try {
        const { data } = await api.getProfile(id);
        dispatch({ type: VIEW_PROFILE, data });
    }
    catch (error) {
        console.log(error);
    }
}

