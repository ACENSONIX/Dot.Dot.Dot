import { ADD_APPLICANT, VIEW_APPLICANT, GET_APPLICANTS } from "../../constants/actionTypes";
import * as api from  "../../api/index.js";

export const addApplicant = (formData) => async (dispatch) => {
    try {
        const { data } = await api.addApplicant(formData);
        dispatch({ type: ADD_APPLICANT, data });
    } catch (error) {
        console.log(error);
    }
}

export const viewApplicant = (id) => async (dispatch) => {
    try {
        const { data } = await api.viewApplicant(id);
        dispatch({ type: VIEW_APPLICANT, data });
    } catch (error) {
        console.log(error);
    }
}

export const getApplicants = () => async (dispatch) => {
    try {
        const { data } = await api.getApplicants();
        dispatch({ type: GET_APPLICANTS, data });
    } catch (error) {
        console.log(error);
    }
}