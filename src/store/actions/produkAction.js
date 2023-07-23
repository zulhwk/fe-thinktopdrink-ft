import { toast } from "react-hot-toast";
import axios from "../../utils/axios";
import produkTypes from "../types/produkTypes";
import { isNegative, isNotNumberValue } from "../../utils/validation";

export const getProduk = (params) => async (dispatch) => {
  try {
    dispatch({
      type: produkTypes.SET_LOADING,
      payload: true,
    });
    const response = await axios.get("product");
    const { data: dataProduk = [] } = response?.data?.response;
    dispatch({
      type: produkTypes.SET_DATA,
      payload: dataProduk,
    });
    setTimeout(() => {
      dispatch({
        type: produkTypes.SET_LOADING,
        payload: false,
      });
    }, 800);
    return response;
  } catch (errors) {
    dispatch({
      type: produkTypes.SET_LOADING,
      payload: false,
    });
    return errors;
  }
};

export const postProduk = (handleClose) => async (dispatch, getState) => {
  try {
    dispatch({ type: produkTypes.REQUEST_POST_PRODUK });
    const {
      produk: { form = {} },
    } = getState();
    let defaultError = {response: {data: { err: {}}}};
    if (isNegative(form.price) || isNotNumberValue(form.price)) {
      defaultError.response.data.err.price = 'Jumlah harga tidak valid.';
      throw defaultError;
    }
    const response = await axios[form.uuid ? "put" : "post"](
      form.uuid ? `product/${form.uuid}` : "product",
      form
    );
    dispatch(getProduk());
    toast.success(`Berhasil ${form.uuid ? "memperbarui" : "menyimpan"} produk`, {
      position: "top-right",
    });
    dispatch({ type: produkTypes.REQUEST_POST_PRODUK_SUCCESS });
    handleClose();
    return response;
  } catch (errors) {
    dispatch({ type: produkTypes.REQUEST_POST_PRODUK_FAILURE });
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
};

export const deleteProduk = (uuid) => async (dispatch) => {
  try {
    const response = await axios.delete(`product/${uuid}`);
    dispatch(getProduk());
    return response;
  } catch (errors) {
    return errors;
  }
};
