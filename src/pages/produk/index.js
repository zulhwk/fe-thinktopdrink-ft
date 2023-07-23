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
import { deleteProduk, getProduk } from "../../store/actions/produkAction";
import DialogAddProduct from "./DialogAddProduct";
import produkTypes from "../../store/types/produkTypes";
import { convertPrice } from "../../utils/currency";
export default function Produk() {
  const { produk, auth: {profile} } = useSelector((state) => state);
  const [showDialogAddProduct, setShowDialogAddProduct] = useState(false);
  const dispatch = useDispatch();

  const isAdmin = useMemo(() => {
    return profile?.role === 2 ? true : false;
  }, [profile]);

  useEffect(() => {
    dispatch(getProduk());
  }, []);

  useEffect(() => {
    if (showDialogAddProduct === false) dispatch({ type: produkTypes.REQUEST_POST_PRODUK_SUCCESS });
  }, [showDialogAddProduct]);

  const handleDelete = (data) => {
    const { uuid = null } = data;
    Swal.fire({
      title: "Apakah Anda yakin ingin menghapus produk?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin",
      cancelButtonText: "Batalkan",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await dispatch(deleteProduk(uuid));
        if (res?.status === 200) {
          Swal.fire("Dihapus!", "Berhasil menghapus produk.", "success");
        }
      }
    });
  };

  const handleEdit = (data) => {
    dispatch({type: produkTypes.SET_FORM, payload: data});
    setShowDialogAddProduct(true);
  }

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
            Produk
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
            disabled={produk.loading}
            onClick={() => setShowDialogAddProduct(true)}
          >
            Tambah Produk
          </Button>
        </Grid>
      </Grid>
      <Card style={{marginBottom: "40px"}}>
        <CardContent>
          <Table headers={["No", "Nama Produk", "Deskripsi", "Harga", "Aksi"]}>
            {!produk.loading &&
              produk.data.map((data, key) => (
                <TableRow key={key}>
                  <TableCell>{key + 1}</TableCell>
                  <TableCell>{data?.product_name}</TableCell>
                  <TableCell>{data?.description}</TableCell>
                  <TableCell>Rp {convertPrice(data?.price)}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton  aria-label="edit" onClick={() => handleEdit(data)}>
                        <ModeEditOutlineRoundedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton
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
          {produk.loading ? (
            <Box sx={{ textAlign: "center", my: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <LinearProgress sx={{ width: "50%" }} />
              </Box>
              <Typography sx={{ mt: 1, fontSize: 12 }}>
                Sedang mengambil data produk
              </Typography>
            </Box>
          ) : null}
        </CardContent>
      </Card>
      <DialogAddProduct
        show={showDialogAddProduct}
        handleClose={() => setShowDialogAddProduct(false)}
      />
    </Box>
  );
}
