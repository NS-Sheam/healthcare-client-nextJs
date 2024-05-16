"use client";

import { useGetMYProfileQuery, useUpdateMYProfileMutation } from "@/redux/api/myProfile";
import { Box, Button, Container, Stack, Typography, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import DoctorInformation from "./components/DoctorInformation";
import AutoFileUploader from "@/components/Forms/AutoFileUploader";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ProfileUpdateModal from "./components/ProfileUpdateModal";
import { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetMYProfileQuery(undefined);
  const [updateMyProfile, { isLoading: updating }] = useUpdateMYProfileMutation();
  // console.log(data);

  const fileUploadHandler = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));
    try {
      await updateMyProfile(formData);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  return (
    <>
      <ProfileUpdateModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={data?.id}
      />
      <Container>
        <Grid
          container
          spacing={2}
        >
          <Grid
            xs={12}
            md={4}
          >
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
            {updating ? (
              <p>Updating...</p>
            ) : (
              <AutoFileUploader
                name="file"
                label="Upload Profile Photo"
                icon={<CloudUploadIcon />}
                onFileUpload={fileUploadHandler}
                variant="text"
              />
            )}
            <Button
              variant="contained"
              onClick={() => setIsModalOpen(true)}
              fullWidth
              endIcon={<ModeEditIcon />}
            >
              Update Profile
            </Button>
          </Grid>
          <Grid
            xs={12}
            md={8}
          >
            <DoctorInformation data={data} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
