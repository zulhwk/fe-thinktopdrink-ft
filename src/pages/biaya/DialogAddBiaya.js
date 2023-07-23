import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  InputAdornment,
  Grid,
  Slide,
  TextField,
  Typography,
  Select,
  MenuItem
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postBiaya } from "../../store/actions/biayaAction";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogAddBiaya({ handleClose, show, data }) {
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.biaya);
  const { akun } = useSelector((state) => state);

  const _akun = React.useMemo(() => {
    let {dataAkun: data = []} = akun;
    return data.filter(value => value.kategori === "operational_expense" || value.kategori === "cost_of_sales");
  }, [akun.dataAkun]);

  const handleSave = async () => {
    try {
      dispatch(postBiaya(handleClose));
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
          <Grid item xs={12} sm={6} md={6} lg={12}>
            <Typography sx={{ fontSize: 15, mb: 1, fontWeight: "500" }}>
              Pilih Akun
            </Typography>
            <Select
              fullWidth
              value={form.id_akun}
              onChange={(e) =>
                dispatch({
                  type: "biaya/setForm",
                  payload: { id_akun: e.target.value },
                })
              }
            >
              {_akun.map((data, key) => (
                <MenuItem value={data?.uuid} key={key}>{data?.nama_akun}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={12}>
            <Typography sx={{ fontSize: 15, mb: 1, fontWeight: "500" }}>
              Deskripsi
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
              required
              fullWidth
              value={form.deskripsi}
              multiline
              rows={4}
              onChange={(e) =>
                dispatch({
                  type: "biaya/setForm",
                  payload: { deskripsi: e.target.value },
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={12}>
            <Typography sx={{ fontSize: 15, mb: 1, fontWeight: "500" }}>
              Harga
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
              value={form.jumlah}
              onChange={(e) =>
                dispatch({
                  type: "biaya/setForm",
                  payload: { jumlah: e.target.value },
                })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Batalkan</Button>
        <Button
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
