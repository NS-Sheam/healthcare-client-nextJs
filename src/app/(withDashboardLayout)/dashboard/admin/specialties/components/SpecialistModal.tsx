import PHFileUploader from "@/components/Forms/PHFileUploader";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";

type TSpecialistModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialistModal = ({ open, setOpen }: TSpecialistModalProps) => {
  const handleFFormSubmit = (values: FieldValues) => {
    // handle form submit
  };

  return (
    <PHModal
      open={open}
      setOpen={setOpen}
      title="Create A New Specialty"
    >
      <PHForm onSubmit={handleFFormSubmit}>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            md={6}
          >
            <PHInput
              name="title"
              label="Title"
            />
          </Grid>
          <Grid
            item
            md={6}
          >
            <PHFileUploader />
          </Grid>
        </Grid>
        <Button
          sx={{
            mt: 1,
          }}
          type="submit"
        >
          Create Specialty
        </Button>
      </PHForm>
    </PHModal>
  );
};

export default SpecialistModal;
