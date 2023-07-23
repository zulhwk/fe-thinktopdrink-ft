import biayaTypes from "../types/biayaTypes";

const initialState = {
  loading: {
    request: false,
    edit: false,
    post: false
  },
  data: [],
  form: {
    id_akun: null,
    deskripsi: null,
    jumlah: null
  }
};

const biayaReducer = (state = initialState, action) => {
  switch(action.type) {
    case biayaTypes.ON_REQUEST_FETCH:
      return {
        ...state,
        loading: {
          ...state.loading,
          request: true
        },
        data: []
      };
    case biayaTypes.ON_REQUEST_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          request: false
        },
        data: []
      };
    case biayaTypes.ON_REQUEST_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          request: false
        },
        data: action?.payload ?? []
      };
    case biayaTypes.SET_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          ...action?.payload
        }
      };
    case biayaTypes.ON_POST_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          post: true
        }
      };
    case biayaTypes.ON_POST_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          post: false
        },
        form: {
          id_akun: null,
          deskripsi: null,
          jumlah: null
        }
      };
    case biayaTypes.ON_POST_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          post: false,
        }
      }
    default:
      return state;
  }
};

export default biayaReducer;