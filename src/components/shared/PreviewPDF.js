import * as React from "react";
import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  Slide
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PreviewPDF({
  show,
  handleClose,
  url,
  maxWidth
}) {
  return (
    <Dialog
      open={show}
      TransitionComponent={Transition}
      maxWidth={maxWidth ?? "lg"}
      fullWidth
      disableEscapeKeyDown={true}
    >
      <iframe
        style={{
          width: '100%',
          height: '500px'
        }}
        title="Laporan"
        src={url}
        datatype="application/pdf"
        frameborder="0"
      />
      <DialogActions>
        <Button onClick={handleClose} variant="contained">Keluar</Button>
      </DialogActions>
    </Dialog>
  )
}