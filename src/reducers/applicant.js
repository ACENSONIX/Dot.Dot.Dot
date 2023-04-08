import * as actionTypes from "../constants/actionTypes";

const applicantReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.ADD_APPLICANT:
            return { ...state, applicantData: action.data, loading: false, errors: null };
        case actionTypes.VIEW_APPLICANT:
            return { ...state, applicantData: action.data, loading: false, errors: null };
        case actionTypes.GET_APPLICANTS:
            return { ...state, applicantData: action.data, loading: false, errors: null };
        default:
            return state;
    }
};

export default applicantReducer;