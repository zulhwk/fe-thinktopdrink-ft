import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TableCell,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import Table from "../../components/table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {deleteBiaya, getBiaya} from "../../store/actions/biayaAction";
import { convertPrice } from "../../utils/currency";
import { getAkun } from "../../store/actions/akunAction";
import DialogAddBiaya from "./DialogAddBiaya";
import biayaTypes from "../../store/types/biayaTypes";
import Swal from "sweetalert2";

export default function Biaya() {
  const dispatch = useDispatch();
  const {biaya} = useSelector((state) => state);
  const [showDialogAddBiaya, setShowDialogAddBiaya] = useState(false);

  const handleEdit = (data) => {
    const payloadEdit = {
      ...data,
      id_akun: data.akun.uuid
    }
    dispatch({type: biayaTypes.SET_FORM, payload: payloadEdit});
    setShowDialogAddBiaya(true);
  }

  const handleDelete = (data) => {
    const { uuid = null } = data;
    Swal.fire({
      title: "Apakah Anda yakin ingin menghapus biaya?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin",
      cancelButtonText: "Batalkan",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await dispatch(deleteBiaya(uuid));
        if (res?.status === 200) {
          Swal.fire("Dihapus!", "Berhasil menghapus biaya.", "success");
        }
      }
    });
  };

  useEffect(() => {
    dispatch(getAkun());
    dispatch(getBiaya());
  }, []);

  return (
    <Box marginTop={2}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        marginBottom={3}
      >
        <Grid item xs={3} sm={4} md={5} lg={6}>
          <Typography fontWeight="bold" fontSize={20}>
            Biaya
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sm={4}
          md={5}
          lg={6}
          justifyContent="end"
          display="flex"
        >
          <Button
            variant="contained"
            size="medium"
            onClick={() => setShowDialogAddBiaya(true)}
          >
            Tambah Biaya
          </Button>
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <Table
            headers={[
              "No",
              "Nama Akun",
              "Deskripsi",
              "Jumlah",
              "Aksi",
            ]}
          >
            {!biaya.loading.request &&
              biaya.data.map((data, key) => (
                <TableRow key={key}>
                  <TableCell>{key + 1}</TableCell>
                  <TableCell>{data?.akun?.nama_akun}</TableCell>
                  <TableCell>{data?.deskripsi}</TableCell>
                  <TableCell>Rp {convertPrice(data?.jumlah)}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton aria-label="edit" onClick={() => handleEdit(data)}>
                        <ModeEditOutlineRoundedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton aria-label="delete" color="error" onClick={() => handleDelete(data)}>
                        <DeleteRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </Table>
          {biaya.loading.request ? (
            <Box sx={{ textAlign: "center", my: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <LinearProgress sx={{ width: "50%" }} />
              </Box>
              <Typography sx={{ mt: 1, fontSize: 12 }}>
                Sedang mengambil data biaya
              </Typography>
            </Box>
          ) : null}
        </CardContent>
      </Card>
      {showDialogAddBiaya && <DialogAddBiaya 
        show={showDialogAddBiaya}
        handleClose={() => setShowDialogAddBiaya(false)}
      />}
    </Box>
  )
}