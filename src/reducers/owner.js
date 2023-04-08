import * as actionTypes from "../constants/actionTypes";

const ownerReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data.cafe }));
      return { ...state, authData: action.data, loading: false, errors: null };
    case actionTypes.REGISTER:
        localStorage.setItem("profile", JSON.stringify({ ...action?.data.cafe }));
        return { ...state, authData: action.data, loading: false, errors: null };
    case actionTypes.VIEW_PROFILE:
        return { ...state, authData: action.data, loading: false, errors: null };
    case actionTypes.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default ownerReducer;
