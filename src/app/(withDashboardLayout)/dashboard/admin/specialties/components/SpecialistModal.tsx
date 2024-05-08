import PHModal from "@/components/Shared/PHModal/PHModal";
import { TextField } from "@mui/material";
import React from "react";

type TSpecialistModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialistModal = ({ open, setOpen }: TSpecialistModalProps) => {
  return (
    <PHModal
      open={open}
      setOpen={setOpen}
      title="Create Specialist"
    >
      <TextField />
    </PHModal>
  );
};

export default SpecialistModal;
