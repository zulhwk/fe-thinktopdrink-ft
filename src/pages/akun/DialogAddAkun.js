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
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postAkun } from "../../store/actions/akunAction";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogAddAkun({ handleClose, show, data }) {
  const dispatch = useDispatch();
  const { form, loading } = useSelector((state) => state.akun);

  const handleSave = async () => {
    try {
      dispatch(postAkun(handleClose));
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
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography sx={{ fontSize: 15, mb: 1, fontWeight: "500" }}>
              Kode Akun
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
              placeholder="Contoh: AKUN-00001"
              autoFocus
              value={form.kode_akun}
              onChange={(e) =>
                dispatch({
                  type: "akun/setForm",
                  payload: { kode_akun: e.target.value },
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography sx={{ fontSize: 15, mb: 1, fontWeight: "500" }}>
              Nama Akun
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
              placeholder="Contoh: Gaji, Biaya Gedung, Biaya Sewa"
              autoFocus
              value={form.nama_akun}
              onChange={(e) =>
                dispatch({
                  type: "akun/setForm",
                  payload: { nama_akun: e.target.value },
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography sx={{ fontSize: 15, mb: 1, fontWeight: "500" }}>
              Kategori
            </Typography>
            <Select
              fullWidth
              value={form.kategori}
              onChange={(e) =>
                dispatch({
                  type: "akun/setForm",
                  payload: { kategori: e.target.value },
                })
              }
            >
              <MenuItem value={"operational_expense"}>
                Biaya Operasional
              </MenuItem>
              <MenuItem value={"revenue"}>Pendapatan</MenuItem>
              <MenuItem value={"cost_of_sales"}>Biaya Penjualan</MenuItem>
              <MenuItem value={"etc"}>Lainnya</MenuItem>
            </Select>
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
          disabled={loading.postAkun}
        >
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
}
