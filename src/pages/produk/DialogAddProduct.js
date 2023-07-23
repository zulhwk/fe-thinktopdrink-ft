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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postProduk } from "../../store/actions/produkAction";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogAddProduct({ handleClose, show, data }) {
  const dispatch = useDispatch();
  const { form, loadingPostProduct } = useSelector((state) => state.produk);

  const handleSave = async () => {
    try {
      dispatch(postProduk(handleClose));
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
              Nama Produk
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
              id="product_name"
              name="product_name"
              placeholder="Contoh: Coffee Latte"
              autoFocus
              value={form.product_name}
              onChange={(e) =>
                dispatch({
                  type: "produk/setForm",
                  payload: { product_name: e.target.value },
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
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
              id="description"
              name="description"
              multiline
              maxRows={5}
              rows={4}
              value={form.description}
              onChange={(e) =>
                dispatch({
                  type: "produk/setForm",
                  payload: { description: e.target.value },
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
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
              required
              fullWidth
              id="price"
              name="price"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
              value={form.price}
              onChange={(e) =>
                dispatch({
                  type: "produk/setForm",
                  payload: { price: e.target.value },
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
          disabled={loadingPostProduct}
        >
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
}
