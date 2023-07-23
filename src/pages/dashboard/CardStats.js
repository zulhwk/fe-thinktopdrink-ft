import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import PropTypes from "prop-types";

export default function CardStats({
  title,
  amount,
  icon,
  backgroundIcon
}) {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item>
            <Typography sx={{color: "#95a5a6"}}>{title}</Typography>
            <Typography sx={{fontSize: 50, fontWeight: "bold"}}>{amount}</Typography>
          </Grid>
          <Grid item>
            <Box
              sx={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                background: backgroundIcon ?? "#f1c40f",
              }}
            >
              {icon}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
};

CardStats.propTypes = {
  title: PropTypes.string,
  amount: PropTypes.number,
  icon: PropTypes.element,
  backgroundIcon: PropTypes.string
};

CardStats.defaultProps = {
  title: "Your Title",
  amount: 100,
  icon: <BarChartRoundedIcon sx={{fontSize: 60, color: "white"}} />,
  backgroundIcon: "#f1c40f"
}