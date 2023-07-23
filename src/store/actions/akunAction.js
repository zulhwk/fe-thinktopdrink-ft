import akunTypes from "../types/akunTypes";
import axios from "../../utils/axios";
import { toast } from "react-hot-toast";

export const getAkun = () => async (dispatch) => {
  try {
    dispatch({ type: akunTypes.GET_AKUN });
    const response = await axios.get("akun");
    const { data: dataAkun = [] } = response?.data?.response;
    dispatch({ type: akunTypes.GET_AKUN_SUCCESS, payload: dataAkun });
    return response;
  } catch (errors) {
    dispatch({ type: akunTypes.GET_AKUN_FAILURE });
    return errors;
  }
};

export const postAkun = (handleClose) => async (dispatch, getState) => {
  try {
    dispatch({ type: akunTypes.POST_AKUN });
    const {
      akun: { form },
    } = getState();
    const response = await axios[form.uuid ? "put" : "post"](
      form.uuid ? `akun/${form.uuid}` : "akun",
      form
    );
    toast.success(`Berhasil ${form.uuid ? "edit data" : "menyimpan"} akun`, {
      position: "top-right",
    });
    dispatch(getAkun());
    dispatch({ type: akunTypes.POST_AKUN_SUCCESS });
    handleClose();
    return response;
  } catch (errors) {
    dispatch({ type: akunTypes.POST_AKUN_FAILURE });
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

export const deleteAkun = (uuid) => async (dispatch) => {
  try {
    const response = await axios.delete(`akun/${uuid}`);
    dispatch(getAkun());
    return response;
  } catch (errors) {
    return errors;
  }
};
