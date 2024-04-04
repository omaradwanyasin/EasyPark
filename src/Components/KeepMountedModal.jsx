import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import BioCard from "./BioCard";
import TextRating from "./TextRating";

export default function KeepMountedModal(props) {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        More Details
      </Button>
      <Modal keepMounted open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>{props.parking.name}</DialogTitle>
          <DialogContent>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>City: {props.parking.City}</span>
              <span>Rating:<TextRating rating={props.parking.rating} /></span>
              <span>Comment: {props.parking.comments}</span>
              <span style={{ backgroundColor: "#FFEBB2" }}>
                Price: {props.parking.price}
              </span>
              <span>Open: {props.parking.workingTime}</span>
            </div>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
