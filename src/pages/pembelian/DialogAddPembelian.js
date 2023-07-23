import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Slide,
  TextField,
  Typography,
  Select,
  MenuItem
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {postPembelian} from "../../store/actions/pembelianAction";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogAddPembelian({ handleClose, show, data }) {
  const dispatch = useDispatch();
  const { form, loading } = useSelector((state) => state.pembelian);
  const { akun, produk } = useSelector((state) => state);

  const _akun = React.useMemo(() => {
    let {dataAkun: data = []} = akun;
    return data.filter(value => value.kategori !== "operational_expense" && value.kategori !== "cost_of_sales");
  }, [akun.dataAkun]);

  const handleSave = async () => {
    try {
      dispatch(postPembelian(handleClose));
    } catch (errors) {
      return errors;
    }
  };

  return (
    <Dialog
      open={show}
      TransitionComponent={Transition}
      maxWidth="md"
      fullWidth
      disableEscapeKeyDown={true}
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography sx={{ fontSize: 15, mb: 1, fontWeight: "500" }}>
              Pilih Akun
            </Typography>
            <Select
              fullWidth
              value={form.akun}
              onChange={(e) =>
                dispatch({
                  type: "pembelian/setForm",
                  payload: { akun: e.target.value },
                })
              }
            >
              {_akun.map((data, key) => (
                <MenuItem value={data?.uuid} key={key}>{data?.nama_akun}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography sx={{ fontSize: 15, mb: 1, fontWeight: "500" }}>
              Pilih Produk
            </Typography>
            <Select
              fullWidth
              value={form.uuid_product}
              onChange={(e) =>
                dispatch({
                  type: "pembelian/setForm",
                  payload: { uuid_product: e.target.value },
                })
              }
            >
              {produk?.data?.map((data, key) => (
                <MenuItem value={data?.uuid} key={key}>{data?.product_name}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography sx={{ fontSize: 15, mb: 1, fontWeight: "500" }}>
              Tipe
            </Typography>
            <Select
              fullWidth
              value={form.tipe}
              onChange={(e) =>
                dispatch({
                  type: "pembelian/setForm",
                  payload: { tipe: e.target.value },
                })
              }
            >
              <MenuItem value={"Debet"}>Debet</MenuItem>
              <MenuItem value={"Kredit"}>Kredit</MenuItem>
              <MenuItem value={"Cash"}>Cash</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography sx={{ fontSize: 15, mb: 1, fontWeight: "500" }}>
              Quantity
            </Typography>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: 2,
                  },
                },
              }}
              variant="outlined"
              type="number"
              required
              fullWidth
              value={form.quantity}
              onChange={(e) =>
                dispatch({
                  type: "pembelian/setForm",
                  payload: { quantity: e.target.value },
                })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Batalkan</Button>
        <Button
          disabled={loading.post}
          onClick={handleSave}
          variant="contained"
          disableElevation
          color="success"
        >
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
}
