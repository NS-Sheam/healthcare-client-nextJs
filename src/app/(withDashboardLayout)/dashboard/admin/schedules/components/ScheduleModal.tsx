import PHDatePicker from "@/components/Forms/PHDatePicker";
import PHForm from "@/components/Forms/PHForm";
import PHTimePicker from "@/components/Forms/PHTimePicker";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const ScheduleModal = ({ open, setOpen }: TProps) => {
  const [createSchedule] = useCreateScheduleMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    values.startDate = dateFormatter(values.startDate);
    values.endDate = dateFormatter(values.endDate);
    values.startTime = timeFormatter(values.startTime);
    values.endTime = timeFormatter(values.endTime);

    try {
      const res = await createSchedule(values);
      console.log(res);

      if ("data" in res && res.data.length) {
        toast.success("Schedule created successfully");
        setOpen(false);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <PHModal
      title="Create Schedule"
      open={open}
      setOpen={setOpen}
    >
      <PHForm onSubmit={handleFormSubmit}>
        <Grid
          container
          spacing={2}
          sx={{
            width: "400px",
          }}
        >
          <Grid
            item
            md={12}
          >
            <PHDatePicker
              name="startDate"
              label="Start Date"
            />
          </Grid>
          <Grid
            item
            md={12}
          >
            <PHDatePicker
              name="endDate"
              label="End Date"
            />
          </Grid>
          <Grid
            item
            md={6}
          >
            <PHTimePicker
              name="startTime"
              label="Start Date"
            />
          </Grid>
          <Grid
            item
            md={6}
          >
            <PHTimePicker
              name="endTime"
              label="End Date"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          sx={{
            mt: 1,
          }}
        >
          Create
        </Button>
      </PHForm>
    </PHModal>
  );
};

export default ScheduleModal;
