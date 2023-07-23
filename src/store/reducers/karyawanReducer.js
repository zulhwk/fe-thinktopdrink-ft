import karyawanTypes from "../types/karyawanTypes";

const initialState = {
  data: [],
  loading: {
    getKaryawan: false,
    postKaryawan: false
  },
  form: {
    full_name: null,
    email: null,
    password: null,
    role: null,
    nickname: null,
    address: null,
    handphone: null,
    gender: null,
    occupation: '-',
    birthday: null,
  }
};

const karyawanReducer = (state = initialState, action) => {
  switch(action.type) {
    case karyawanTypes.ON_REQUEST_FETCH:
      return {
        ...state,
        data: [],
        loading: {
          ...state.loading,
          getKaryawan: true
        }
      };
    case karyawanTypes.ON_REQUEST_FAILURE:
      return {
        ...state,
        data: [],
        loading: {
          ...state.loading,
          getKaryawan: false
        }
      };
    case karyawanTypes.ON_REQUEST_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          getKaryawan: false
        },
        data: action?.payload ?? []
      };
    case karyawanTypes.SET_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          ...action?.payload
        }
      };
    case karyawanTypes.ON_POST_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          postKaryawan: true
        }
      };
    case karyawanTypes.ON_POST_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          postKaryawan: false
        }
      };
    case karyawanTypes.ON_POST_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          postKaryawan: false
        },
        form: {
          full_name: null,
          email: null,
          password: null,
          role: null,
          nickname: null,
          address: null,
          handphone: null,
          gender: null,
          occupation: '-',
          birthday: null,
        }
      };
    default:
      return state;
  }
};

export default karyawanReducer;