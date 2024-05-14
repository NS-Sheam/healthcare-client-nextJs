import PHModal from "@/components/Shared/PHModal/PHModal";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import MultipleSelectFieldChip from "./MultipleSelectFieldChip";
import { Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCreateDoctorScheduleMutation } from "@/redux/api/doctorScheduleApi";
import { toast } from "sonner";

type TDoctorScheduleModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorScheduleModal = ({ open, setOpen }: TDoctorScheduleModalProps) => {
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()).toISOString());
  const [selectedScheduleIds, setSelectedScheduleIds] = useState<string[]>([]);

  const query: Record<string, unknown> = {};
  if (!!selectedDate) {
    query["startDate"] = dayjs(selectedDate).hour(0).minute(0).millisecond(0).toISOString();
    query["endDate"] = dayjs(selectedDate).hour(23).minute(59).millisecond(999).toISOString();
  }
  const { data } = useGetAllSchedulesQuery(query);
  const [createDoctorSchedule, { isLoading }] = useCreateDoctorScheduleMutation();

  const schedules = data?.schedules || [];
  const onSubmit = async () => {
    try {
      const res = await createDoctorSchedule({
        scheduleIds: selectedScheduleIds,
      }).unwrap();
      if (res?.count > 0) {
        toast.success("Doctor Schedule created successfully");
        setOpen(false);
      }
    } catch (error) {
      toast.error("Failed to create Doctor Schedule");
    }
  };
  return (
    <PHModal
      open={open}
      setOpen={setOpen}
      title="Create Doctor Schedule"
    >
      <Stack
        direction="column"
        gap={2}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={dayjs(selectedDate)}
              onChange={(newValue) => setSelectedDate(dayjs(newValue).toISOString())}
              label="Controller Datepicker"
              sx={{
                width: "100%",
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <MultipleSelectFieldChip
          schedules={schedules}
          selectedScheduleIds={selectedScheduleIds}
          setSelectedScheduleIds={setSelectedScheduleIds}
        />
        <LoadingButton
          size="small"
          onClick={onSubmit}
          loading={isLoading}
          loadingIndicator="Submitting..."
          variant="contained"
        >
          <span>Fetch data</span>
        </LoadingButton>
      </Stack>
    </PHModal>
  );
};

export default DoctorScheduleModal;
