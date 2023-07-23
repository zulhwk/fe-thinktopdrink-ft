import axios from "../../utils/axios";
import { isNegative, isNotNumberValue } from "../../utils/validation";
import pembelianTypes from "../types/pembelianTypes";
import { toast } from "react-hot-toast";

export const getPembelian = () => async (dispatch) => {
  try {
    dispatch({type: pembelianTypes.ON_REQUEST_FETCH});
    const response = await axios.get(`pembelian`);
    const { data: dataPembelian = [] } = response?.data?.response;
    dispatch({type: pembelianTypes.ON_REQUEST_SUCCESS, payload: dataPembelian});
    return response;
  } catch (errors) {
    dispatch({type: pembelianTypes.ON_REQUEST_FAILURE});
    return errors;
  }
};

export const postPembelian = (handleClose) => async (dispatch, getState) => {
  try {
    dispatch({type: pembelianTypes.ON_POST_REQUEST});
    const {form} = getState().pembelian;
    let _form = {...form};
    let defaultError = {response: {data: { err: {}}}};
    if (isNegative(_form.quantity) || isNotNumberValue(_form.quantity)) {
      defaultError.response.data.err.quantity = 'Jumlah quantity tidak valid.';
      throw defaultError;
    }
    _form.waktu = _form?.waktu ? _form?.waktu : new Date();
    if (form.uuid && typeof form.product == 'object') {
      _form.product = _form.product.uuid;
    }
    const response = await axios[form.uuid ? `put` : `post`](form.uuid ? `pembelian/${form.uuid}` : `pembelian`, _form);
    toast.success(`Berhasil ${form.uuid ? "edit data" : "menyimpan"} pembelian`, {
      position: "top-right",
    });
    dispatch(getPembelian());
    dispatch({type: pembelianTypes.ON_POST_SUCCESS});
    handleClose();
    return response;
  } catch (errors) {
    dispatch({type: pembelianTypes.ON_POST_FAILURE});
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

export const deletePembelian = (uuid) => async (dispatch) => {
  try {
    const response = await axios.delete(`pembelian/${uuid}`);
    dispatch(getPembelian());
    return response;
  } catch (errors) {
    toast.error('Gagal menghapus transaksi pembelian', {
      position: 'top-right'
    });
    return errors;
  }
}