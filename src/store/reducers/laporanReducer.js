import laporanTypes from "../types/laporanTypes";

const initialState = {
  filter: {
    bulan: '',
    tahun: ''
  },
  loading: {
    request: false
  },
  data: [],
  laba: {
    revenue: {
      data: [],
      total: 0,
    },
    expense: {
      total: 0,
      data: [],
    },
    cos: {
      total: 0,
      data: [],
    },
  }
};

export const laporanReducer = (state = initialState, action) => {
  switch(action.type) {
    case laporanTypes.SET_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action?.payload
        }
      };
    case laporanTypes.ON_REQUEST_FETCH: {
      return {
        ...state,
        loading: {
          ...state.loading,
          request: true
        },
        data: [],
        laba: {
          revenue: {
            data: [],
            total: 0,
          },
          expense: {
            total: 0,
            data: [],
          },
          cos: {
            total: 0,
            data: [],
          },
        }
      };
    }
    case laporanTypes.ON_REQUEST_SUCCESS: {
      return {
        ...state,
        loading: {
          ...state.loading,
          request: false
        },
        data: action?.payload ?? []
      };
    }
    case laporanTypes.ON_REQUEST_FAILURE: {
      return {
        ...state,
        loading: {
          ...state.loading,
          request: false
        },
        data: [],
        laba: {
          revenue: {
            data: [],
            total: 0,
          },
          expense: {
            total: 0,
            data: [],
          },
          cos: {
            total: 0,
            data: [],
          },
        }
      };
    }
    case laporanTypes.SET_DATA_LABA: {
      return {
        ...state,
        laba: {
          ...state.laba,
          ...action?.payload
        }
      }
    }
    default:
      return state;
  }
};

export default laporanReducer;