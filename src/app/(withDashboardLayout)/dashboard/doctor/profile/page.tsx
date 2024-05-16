"use client";

import { useGetMYProfileQuery } from "@/redux/api/myProfile";
import { Box, Container, Stack, Typography, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import DoctorInformation from "./components/DoctorInformation";

const StyledInformationBox = styled(Box)(({ theme }) => ({
  background: "#f4f7fe",
  borderRadius: theme.spacing(1),
  padding: "8px 16px",
  width: "45%",
  "& p": {
    fontWeight: 600,
  },
}));

const Profile = () => {
  const { data, isLoading } = useGetMYProfileQuery(undefined);
  console.log(data);

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Grid
        container
        spacing={2}
      >
        <Grid xs={4}>
          <Box
            sx={{
              height: 300,
              width: "100%",
              overflow: "hidden",
              borderRadius: 1,
            }}
          >
            <Image
              height={300}
              width={400}
              src={data?.profilePhoto}
              alt="profile"
            />
          </Box>
        </Grid>
        <Grid xs={8}>
          <DoctorInformation data={data} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
