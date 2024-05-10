import PHFileUploader from "@/components/Forms/PHFileUploader";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { useCreateSpecialtyMutation } from "@/redux/api/specialtiesApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Try } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TSpecialtyModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialtyModal = ({ open, setOpen }: TSpecialtyModalProps) => {
  const [createSpecialty] = useCreateSpecialtyMutation();
  const handleFFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await createSpecialty(data).unwrap();
      if (res?.id) {
        toast.success("Specialty created successfully");
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
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
            <PHFileUploader
              name="file"
              label="Upload File"
            />
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

export default SpecialtyModal;
