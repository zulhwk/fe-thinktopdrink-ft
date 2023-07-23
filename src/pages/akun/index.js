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
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getAkun, deleteAkun } from "../../store/actions/akunAction";
import DialogAddAkun from "./DialogAddAkun";
import akunTypes from "../../store/types/akunTypes";

export default function Akun() {
  const { akun, auth: {profile} } = useSelector((state) => state);
  const [showDialogAddAkun, setShowDialogAddAkun] = useState(false);
  const dispatch = useDispatch();

  const isAdmin = useMemo(() => {
    return profile?.role === 2 ? true : false;
  }, [profile]);

  useEffect(() => {
    dispatch(getAkun());
  }, []);

  const handleDelete = (data) => {
    const { uuid = null } = data;
    Swal.fire({
      title: "Apakah Anda yakin ingin menghapus akun?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin",
      cancelButtonText: "Batalkan",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await dispatch(deleteAkun(uuid));
        if (res?.status === 200) {
          Swal.fire("Dihapus!", "Akun telah dihapus.", "success");
        }
      }
    });
  };

  const handleEdit = (data) => {
    dispatch({ type: akunTypes.SET_FORM, payload: data });
    setShowDialogAddAkun(true);
  };

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
            Akun
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
          {isAdmin && <Button
            variant="contained"
            size="medium"
            disabled={akun.loading.getAkun}
            onClick={() => setShowDialogAddAkun(true)}
          >
            Tambah Akun
          </Button>}
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <Table headers={["No", "Kode", "Nama Akun", "Aksi"]}>
            {!akun.loading.getAkun &&
              akun.dataAkun.map((data, key) => (
                <TableRow key={key}>
                  <TableCell>{key + 1}</TableCell>
                  <TableCell>{data?.kode_akun}</TableCell>
                  <TableCell>{data?.nama_akun}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        disabled={!isAdmin}
                        aria-label="edit"
                        onClick={() => handleEdit(data)}
                      >
                        <ModeEditOutlineRoundedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton
                        disabled={!isAdmin}
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDelete(data)}
                      >
                        <DeleteRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </Table>
          {akun.loading.getAkun ? (
            <Box sx={{ textAlign: "center", my: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <LinearProgress sx={{ width: "50%" }} />
              </Box>
              <Typography sx={{ mt: 1, fontSize: 12 }}>
                Sedang mengambil data akun
              </Typography>
            </Box>
          ) : null}
        </CardContent>
      </Card>
      <DialogAddAkun
        show={showDialogAddAkun}
        handleClose={() => setShowDialogAddAkun(false)}
      />
    </Box>
  );
}
