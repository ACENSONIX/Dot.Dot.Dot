import * as actionTypes from "../constants/actionTypes";

const ownerReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      console.log(action.data);
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, errors: null };
    case actionTypes.REGISTER:
        
    case actionTypes.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default ownerReducer;
