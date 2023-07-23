import {
  Box,
  TableRow,
  TableCell,
  Table as MuiTable,
  TableBody,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../utils/currency";
import { LoadingButton } from "@mui/lab";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import moment from "moment";
import PreviewPDF from "../../components/shared/PreviewPDF";
import { printLaporanLabaRugi } from "../../store/actions/laporanAction";

export default function ContentTabLabaRugi() {
  const dispatch = useDispatch();
  const { laporan } = useSelector((state) => state);
  const [loadingGetUrlPdf, setLoadingGetUrlPdf] = useState(false);
  const [showDialogPrintPdf, setShowDialogPrintPdf] = useState(false);
  const [urlPdf, setUrlPdf] = useState(null);

  const laba = useMemo(() => {
    return laporan.laba;
  }, [laporan.laba]);

  const periode = useMemo(() => {
    const { tahun, bulan } = laporan.filter;
    const _period =
      tahun && !bulan
        ? moment(new Date(tahun?.$d)).format("YYYY")
        : tahun && bulan
        ? `${moment(new Date(bulan?.$d)).format("MMM")} ${moment(
            new Date(tahun?.$d)
          ).format("YYYY")}`
        : moment(new Date()).format("YYYY");
    return _period;
  }, [laporan.filter.bulan, laporan.filter.tahun]);

  const handlePrint = async () => {
    setLoadingGetUrlPdf(true);
    const dataPrint = await dispatch(printLaporanLabaRugi());
    if (dataPrint) {
      setUrlPdf(dataPrint);
      setShowDialogPrintPdf(true);
    }
    setLoadingGetUrlPdf(false);
  };

  return (
    <Box component="div">
      <Box
        component="div"
        sx={{ mb: 2, display: "flex", justifyContent: "end" }}
      >
        <LoadingButton loading={loadingGetUrlPdf} onClick={handlePrint} sx={{ ml: 1 }} variant="contained" disableElevation>
          <PrintRoundedIcon />
        </LoadingButton>
      </Box>
      <MuiTable>
        <TableBody>
          {/* HEADERS */}
          <TableRow>
            <TableCell
              colSpan={3}
              sx={{
                backgroundColor: "#063970",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Periode
            </TableCell>
            <TableCell
              align="right"
              sx={{
                backgroundColor: "#063970",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {periode}
            </TableCell>
          </TableRow>
          {/* PENDAPATAN */}
          <TableRow>
            <TableCell
              colSpan={4}
              sx={{
                backgroundColor: "#00479B",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Pendapatan
            </TableCell>
          </TableRow>
          {laba.revenue.data.map((data, key) => (
            <TableRow key={key}>
              <TableCell width="2%" />
              <TableCell width="20%">{data?.kode_akun}</TableCell>
              <TableCell>{data?.nama_akun}</TableCell>
              <TableCell align="right">
                Rp {convertPrice(data?.saldo)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ background: "#edf0f2" }}>
            <TableCell width="2%" />
            <TableCell colSpan={2}>Total dari Pendapatan</TableCell>
            <TableCell align="right">
              Rp {convertPrice(laba.revenue?.total)}
            </TableCell>
          </TableRow>

          {/* COST OF SALES */}
          <TableRow>
            <TableCell
              colSpan={4}
              sx={{
                backgroundColor: "#00479B",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Biaya Penjualan
            </TableCell>
          </TableRow>
          {laba.cos.data.map((data, key) => (
            <TableRow key={key}>
              <TableCell width="2%" />
              <TableCell width="20%">{data?.kode_akun}</TableCell>
              <TableCell>{data?.nama_akun}</TableCell>
              <TableCell align="right">
                Rp {convertPrice(data?.saldo)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ background: "#edf0f2" }}>
            <TableCell width="2%" />
            <TableCell colSpan={2}>Total dari Biaya Penjualan</TableCell>
            <TableCell align="right">
              Rp {convertPrice(laba.cos?.total)}
            </TableCell>
          </TableRow>
          <TableRow sx={{ background: "#edf0f2" }}>
            <TableCell colSpan={3} sx={{ fontWeight: "bold" }}>
              Laba kotor
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Rp {convertPrice(laba.revenue.total - laba.cos.total)}
            </TableCell>
          </TableRow>

          {/* BEBAN */}
          <TableRow>
            <TableCell
              colSpan={4}
              sx={{
                backgroundColor: "#00479B",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Beban Operasional
            </TableCell>
          </TableRow>
          {laba.expense.data.map((data, key) => (
            <TableRow key={key}>
              <TableCell width="2%" />
              <TableCell width="20%">{data?.kode_akun}</TableCell>
              <TableCell>{data?.nama_akun}</TableCell>
              <TableCell align="right">
                Rp {convertPrice(data?.saldo)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ background: "#edf0f2" }}>
            <TableCell width="2%" />
            <TableCell colSpan={2}>Total dari Beban Operasional</TableCell>
            <TableCell align="right">
              Rp {convertPrice(laba.expense.total)}
            </TableCell>
          </TableRow>
          <TableRow sx={{ background: "#edf0f2" }}>
            <TableCell colSpan={3} sx={{ fontWeight: "bold" }}>
              Laba
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Rp{" "}
              {convertPrice(
                laba.revenue.total - laba.cos.total - laba.expense.total
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </MuiTable>
      <PreviewPDF
        show={showDialogPrintPdf}
        handleClose={() => setShowDialogPrintPdf(false)}
        url={urlPdf}
      />
    </Box>
  );
}
