import * as actionTypes from "../constants/actionTypes";

const employeeReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.GET_EMPLOYEES:
        return {
            ...state,
            employeeData: action.data,
            loading: false,
            errors: null,
        };
        default:
        return state;
    }
    }

export default employeeReducer;