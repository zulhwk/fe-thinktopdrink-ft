import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Tabs,
  Tab,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLaporan } from "../../store/actions/laporanAction";
import ContentTabLaporan from "./ContentTabLaporan";
import ContentTabLabaRugi from "./ContentTabLabaRugi";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Laporan() {
  const dispatch = useDispatch();
  const { laporan } = useSelector((state) => state);

  const bulan = useMemo(() => {
    return laporan.filter.bulan;
  }, [laporan.filter]);

  const years = useMemo(() => {
    return laporan.filter.tahun;
  }, [laporan.filter.tahun]);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTerapkan = () => {
    dispatch(getLaporan());
  };

  useEffect(() => {
    handleTerapkan();
  }, []);

  return (
    <Box component="div">
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        marginBottom={3}
      >
        <Grid item xs={3} sm={4} md={5} lg={6}>
          <Typography fontWeight="bold" fontSize={20}>
            Laporan
          </Typography>
        </Grid>
        <Grid item xs={3} sm={4} md={5} lg={6}>
          <Grid container spacing={1} justifyContent="end">
            <Grid item xs={2} lg={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl fullWidth>
                  <DatePicker
                    views={["month"]}
                    label="Bulan"
                    value={bulan}
                    inputFormat="MMMM"
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                    onChange={(newValue) =>
                      dispatch({
                        type: "laporan/setFilter",
                        payload: { bulan: newValue },
                      })
                    }
                  />
                </FormControl>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2} lg={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl fullWidth>
                  <DatePicker
                    views={["year"]}
                    label="Tahun"
                    value={years}
                    inputFormat="YYYY"
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                    onChange={(newValue) =>
                      dispatch({
                        type: "laporan/setFilter",
                        payload: { tahun: newValue },
                      })
                    }
                  />
                </FormControl>
              </LocalizationProvider>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                disableElevation
                onClick={() => handleTerapkan()}
              >
                Terapkan
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <Box component="div" sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Laporan" {...a11yProps(0)} />
              <Tab label="Laba Rugi" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ContentTabLaporan />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ContentTabLabaRugi />
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  );
}
