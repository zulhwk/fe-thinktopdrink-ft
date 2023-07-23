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
import { deletePembelian, getPembelian } from "../../store/actions/pembelianAction";
import { convertPrice } from "../../utils/currency";
import pembelianTypes from "../../store/types/pembelianTypes";
import Swal from "sweetalert2";
import DialogAddPembelian from "./DialogAddPembelian";
import { getProduk } from "../../store/actions/produkAction";
import { getAkun } from "../../store/actions/akunAction";

export default function Pembelian() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.pembelian);
  const [showDialogAddPembelian, setShowDialogAddPembelian] = useState(false);

  const handleDelete = (data) => {
    const { uuid = null } = data;
    Swal.fire({
      title: "Apakah Anda yakin ingin menghapus transaksi pembelian?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin",
      cancelButtonText: "Batalkan",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await dispatch(deletePembelian(uuid));
        if (res?.status === 200) {
          Swal.fire("Dihapus!", "Transaksi pembelian telah dihapus.", "success");
        }
      }
    });
  };
  const handleEdit = async (data) => {
    let _data = {...data};
    _data.akun = data?.akun?.uuid;
    _data.uuid_product = data?.product?.uuid;
    dispatch({type: pembelianTypes.SET_FORM, payload: _data});
    setShowDialogAddPembelian(true);
  };

  useEffect(() => {
    dispatch(getPembelian());
    dispatch(getProduk());
    dispatch(getAkun());
  }, []);

  useEffect(() => {
    if (showDialogAddPembelian === false) dispatch({type: pembelianTypes.ON_POST_SUCCESS});
  }, [showDialogAddPembelian]);

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
            Pembelian
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
            disabled={loading.fetch}
            onClick={() => setShowDialogAddPembelian(true)}
          >
            Tambah Pembelian
          </Button>
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <Table
            headers={[
              "No",
              "Nama Produk",
              "Quantity",
              "Harga",
              "Total",
              "Aksi",
            ]}
          >
            {!loading.fetch &&
              data.map((data, key) => (
                <TableRow key={key}>
                  <TableCell>{key + 1}</TableCell>
                  <TableCell>{data?.product?.product_name}</TableCell>
                  <TableCell>{data?.quantity}</TableCell>
                  <TableCell>Rp {convertPrice(data?.product?.price)}</TableCell>
                  <TableCell>
                    Rp {convertPrice(data?.product?.price * data?.quantity)}
                  </TableCell>
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
          {loading.fetch ? (
            <Box sx={{ textAlign: "center", my: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <LinearProgress sx={{ width: "50%" }} />
              </Box>
              <Typography sx={{ mt: 1, fontSize: 12 }}>
                Sedang mengambil data pembelian
              </Typography>
            </Box>
          ) : null}
        </CardContent>
      </Card>
      <DialogAddPembelian 
        show={showDialogAddPembelian}
        handleClose={() => setShowDialogAddPembelian(false)}
      />
    </Box>
  );
}
