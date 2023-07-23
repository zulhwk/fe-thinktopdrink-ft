import authTypes from "../types/authTypes";

const initialState = {
  profile: null,
  loading: false,
  token: {
    refresh_token: null,
    access_token: null
  },
  isLoggedIn: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.SET_LOADING:
      return {
        ...state,
        loading: action?.payload,
      };
    case authTypes.SET_PROFILE:
      return {
        ...state,
        profile: action?.payload ?? null
      };
    case authTypes.SET_TOKEN:
      return {
        ...state,
        token: action?.payload
      };
    case authTypes.SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action?.payload ?? false
      };
    default:
      return state;
  }
};
export default authReducer;