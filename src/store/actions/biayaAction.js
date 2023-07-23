import { toast } from "react-hot-toast";
import axios from "../../utils/axios";
import biayaTypes from "../types/biayaTypes";
import { isNegative, isNotNumberValue } from "../../utils/validation";

export const getBiaya = () => async (dispatch) => {
  try {
    dispatch({type: biayaTypes.ON_REQUEST_FETCH});
    const response = await axios.get(`biaya`);
    setTimeout(() => {
      const {data: dataBiaya = []} = response?.data?.response;
      dispatch({type: biayaTypes.ON_REQUEST_SUCCESS, payload: dataBiaya});
    }, 1000);
    return response;
  } catch (errors) {
    dispatch({type: biayaTypes.ON_REQUEST_FAILURE});
    return errors;
  }
};

export const postBiaya = (callback) => async (dispatch, getState) => {
  try {
    dispatch({type: biayaTypes.ON_POST_REQUEST});
    const {form} = getState().biaya;
    const {uuid = null} = form;
    let defaultError = {response: {data: { err: {}}}};
    if (isNegative(form.jumlah) || isNotNumberValue(form.jumlah)) {
      defaultError.response.data.err.jumlah = 'Jumlah harga tidak valid.';
      throw defaultError;
    }
    const response = await axios[uuid ? 'put' : 'post'](uuid ? `biaya/${uuid}` : `biaya`, form);
    setTimeout(() => {
      toast.success('Berhasil menyimpan data biaya.', {
        position: 'top-right'
      });
      dispatch({type: biayaTypes.ON_POST_SUCCESS});
      dispatch(getBiaya());
      callback();
    }, 800);
    return response;
  } catch (errors) {
    dispatch({type: biayaTypes.ON_POST_FAILURE});
    const {err = null} = errors?.response?.data;
    if (err == null) return;
    for (const key in err) {
      if (err[key] == null) continue;
      toast.error(err[key], {
        position: "top-right"
      });
    }
    return errors;
  }
}

export const deleteBiaya = (uuid) => async (dispatch) => {
  try {
    const response = await axios.delete(`biaya/${uuid}`);
    dispatch(getBiaya());
    return response;
  } catch (errors) {
    return errors;
  }
};