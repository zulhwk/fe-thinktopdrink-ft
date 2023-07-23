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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { postKaryawan } from "../../store/actions/karyawanAction";
import { isEmailValid } from "../../utils/validation";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogAddKaryawan({ handleClose, show, data }) {
  const dispatch = useDispatch();
  const { form, loading } = useSelector((state) => state.karyawan);

  const handleSave = async () => {
    try {
      dispatch(postKaryawan(handleClose));
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
              Nama Lengkap
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
              autoFocus
              value={form.full_name}
              onChange={(e) =>
                dispatch({
                  type: "karyawan/setForm",
                  payload: { full_name: e.target.value },
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography sx={{ fontSize: 15, mb: 1, fontWeight: "500" }}>
              Alamat
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
              multiline
              maxRows={5}
              rows={4}
              value={form.address}
              onChange={(e) =>
                dispatch({
                  type: "karyawan/setForm",
                  payload: { address: e.target.value },
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography sx={{ fontSize: 15, mb: 1, fontWeight: "500" }}>
                Tanggal Lahir
              </Typography>
              <DatePicker
                value={form.birthday}
                renderInput={(params) => <TextField {...params} fullWidth />}
                onChange={(newValue) =>
                  dispatch({
                    type: "karyawan/setForm",
                    payload: { birthday: newValue },
                  })
                }
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography sx={{ fontSize: 15, mb: 1, fontWeight: "500" }}>
              Jenis Kelamin
            </Typography>
            <Select
              fullWidth
              value={form.gender}
              onChange={(e) =>
                dispatch({
                  type: "karyawan/setForm",
                  payload: { gender: e?.target?.value },
                })
              }
            >
              <MenuItem value="L">Laki - Laki</MenuItem>
              <MenuItem value="P">Perempuan</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography sx={{ fontSize: 15, mb: 1, fontWeight: "500" }}>
              Nomor Handpone
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
              value={form.handphone}
              onChange={(e) =>
                dispatch({
                  type: "karyawan/setForm",
                  payload: { handphone: e.target.value },
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography sx={{ fontSize: 15, mb: 1, fontWeight: "500" }}>
              Email
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
              type="email"
              value={form.email}
              error={form.email ? !isEmailValid(form.email) : false}
              helperText={form.email ? isEmailValid(form.email) ? '' : 'Masukkan email yang valid.' : ''}
              onChange={(e) =>
                dispatch({
                  type: "karyawan/setForm",
                  payload: { email: e.target.value },
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography sx={{ fontSize: 15, mb: 1, fontWeight: "500" }}>
              Username
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
              value={form.nickname}
              onChange={(e) =>
                dispatch({
                  type: "karyawan/setForm",
                  payload: { nickname: e.target.value },
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography sx={{ fontSize: 15, mb: 1, fontWeight: "500" }}>
              Password
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
              type="password"
              value={form.password}
              onChange={(e) =>
                dispatch({
                  type: "karyawan/setForm",
                  payload: { password: e.target.value },
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={12}>
            <Typography sx={{ fontSize: 15, mb: 1, fontWeight: "500" }}>
              Role
            </Typography>
            <Select
              fullWidth
              value={form.role}
              onChange={(e) =>
                dispatch({
                  type: "karyawan/setForm",
                  payload: { role: e?.target?.value },
                })
              }
            >
              <MenuItem value="2">Admin</MenuItem>
              <MenuItem value="1">Pegawai</MenuItem>
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
          disabled={loading.postKaryawan}
        >
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
}
