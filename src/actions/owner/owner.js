import { LOGIN, LOGOUT, REGISTER } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const login = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.login(formData);
        dispatch({ type: LOGIN, data });
        history.push("/dashboard/app");
    } catch (error) {
        console.log(error);
    }
};

export const register = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.register(formData);
        dispatch({ type: REGISTER, data });
        history.push("/dashboard/app");
    } catch (error) {
        console.log(error);
    }
}

export const logout = () => (dispatch) => {
    try {
        dispatch({ type: LOGOUT });
        history.push("/login");
    } catch (error) {
        console.log(error);
    }
}