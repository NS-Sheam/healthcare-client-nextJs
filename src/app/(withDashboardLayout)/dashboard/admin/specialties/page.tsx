import PHModal from "@/components/Shared/PHModal/PHModal";
import { Box, Button, Stack, TextField } from "@mui/material";

const SpecialtiesPage = () => {
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button>Create Specialty</Button>
        <PHModal />
        <TextField
          size="small"
          placeholder="Search Specialtist"
        />
      </Stack>
    </Box>
  );
};

export default SpecialtiesPage;
