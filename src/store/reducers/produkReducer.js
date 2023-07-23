import produkTypes from "../types/produkTypes";

const initialState = {
  data: [],
  loading: false,
  form: {
    uuid: undefined,
    product_name: '',
    price: 0,
    description: '',
    stock: 0
  },
  loadingPostProduct: false
};

const produkReducer = (state = initialState, action) => {
  switch(action.type) {
    case produkTypes.SET_LOADING:
      return {
        ...state,
        loading: action?.payload ?? false
      };
    case produkTypes.SET_DATA:
      return {
        ...state,
        data: action?.payload ?? []
      };
    case produkTypes.SET_FORM:
      return {
        ...state,
        form: action?.payload ? {
          ...state.form,
          ...action?.payload
        } : {
          uuid: undefined,
          product_name: '',
          price: 0,
          description: 0,
          stock: 0
        }
      };
    case produkTypes.REQUEST_POST_PRODUK:
      return {
        ...state,
        loadingPostProduct: true
      };
    case produkTypes.REQUEST_POST_PRODUK_FAILURE:
      return {
        ...state,
        loadingPostProduct: false
      };
    case produkTypes.REQUEST_POST_PRODUK_SUCCESS:
      return {
        ...state,
        loadingPostProduct: false,
        form: {
          uuid: undefined,
          product_name: '',
          price: 0,
          description: '',
          stock: 0
        },
      }
    default:
      return state;
  };
};

export default produkReducer;