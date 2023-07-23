import { Box, Grid } from "@mui/material";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import CardStats from "./CardStats";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getSummaryDashboard } from "../../store/actions/dashboardAction";
import ChartPembelian from "./ChartPembelian";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [countPenjualan, setCountPenjualan] = useState(0);
  const [countTransaksi, setCountTransaksi] = useState(0);
  const [dataChartPenjualan, setDataChartPenjualan] = useState({
    labels: [],
    datasets: [
      {
        label: 'Penjualan',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  });
  async function getSummary() {
    const response = await dispatch(getSummaryDashboard());
    const {chartData, count: _penjualanCount} = response?.data?.response?.pembelian;
    const {transaksi} = response?.data?.response;
    setDataChartPenjualan({
      labels: chartData.label,
      datasets: [
        {
          label: 'Penjualan',
          data: chartData.data,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ]
    });
    setCountPenjualan(_penjualanCount);
    setCountTransaksi(transaksi);
  }
  useEffect(() => {
    getSummary();
  }, []);
  return (
    <Box>
      <Grid container spacing={3} justifyContent="space-evenly">
        <Grid item xs={2} sm={3} md={4} lg={5}>
          <CardStats
            title="Transaksi"
            amount={countTransaksi}
            icon={<BarChartRoundedIcon sx={{ fontSize: 60, color: "white" }} />}
          />
        </Grid>
        <Grid item xs={2} sm={3} md={4} lg={5}>
          <CardStats
            title="Penjualan"
            amount={countPenjualan}
            icon={
              <ShoppingCartRoundedIcon sx={{ fontSize: 60, color: "white" }} />
            }
            backgroundIcon="#e74c3c"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{marginTop: 2, mb: 3}}>
        <Grid item xs={12} lg={12}>
          <ChartPembelian data={dataChartPenjualan} />
        </Grid>
      </Grid>
    </Box>
  );
}
