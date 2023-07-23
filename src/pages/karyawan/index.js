import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  TableRow,
  TableCell,
  Tooltip,
  IconButton
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/table";
import { deleteKaryawan, getKaryawan } from "../../store/actions/karyawanAction";
import DialogAddKaryawan from "./DialogAddKaryawan";
import Swal from "sweetalert2";

export default function Karyawan() {
  const dispatch = useDispatch();
  const {karyawan} = useSelector((state) => state);
  const [showDialogAddKaryawan, setShowDialogAddKaryawan] = useState(false);
  const handleDelete = (data) => {
    const { uuid = null } = data;
    Swal.fire({
      title: "Apakah Anda yakin ingin menghapus karyawan ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin",
      cancelButtonText: "Batalkan",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await dispatch(deleteKaryawan(uuid));
        if (res?.status === 200) {
          Swal.fire("Dihapus!", "Karyawan telah dihapus.", "success");
        }
      }
    });
  };
  useEffect(() => {
    dispatch(getKaryawan());
  }, []);
  return (
    <Box component="div" marginTop={2}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        marginBottom={3}
      >
        <Grid item xs={3} sm={4} md={5} lg={6}>
          <Typography fontWeight="bold" fontSize={20}>
            Karyawan
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
            onClick={() => setShowDialogAddKaryawan(true)}
          >
            Tambah Karyawan
          </Button>
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <Table
            headers={['No', 'Nama Lengkap', 'Jenis Kelamin', 'Alamat','Aksi']}
          >
            {karyawan.data.map((data, key) => (
              <TableRow key={key}>
                <TableCell>{key + 1}</TableCell>
                <TableCell>{data?.full_name}</TableCell>
                <TableCell>{data?.personal_data?.gender === "P" ? "Perempuan" : "Laki - Laki"}</TableCell>
                <TableCell>{data?.personal_data?.address}</TableCell>
                <TableCell>
                  <Tooltip title="Hapus">
                    <IconButton aria-label="delete" color="error" onClick={() => handleDelete(data)}>
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </CardContent>
      </Card>
      <DialogAddKaryawan 
        show={showDialogAddKaryawan}
        handleClose={() => setShowDialogAddKaryawan(false)}
      />
    </Box>
  );
}
