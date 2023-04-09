import {GET_EMPLOYEES, FLAG_EMPLOYEE} from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const getEmployees = (id) => async (dispatch) => {
    try {
        const { data } = await api.getEmployees(id);
        dispatch({ type: GET_EMPLOYEES, data });
    } catch (error) {
        console.log(error);
    }
}

export const flagEmployee = (id) => async (dispatch) => {
    try {
        const { data } = await api.flagEmployee(id);
        dispatch({ type: FLAG_EMPLOYEE, data });
    } catch (error) {
        console.log(error);
    }
}
