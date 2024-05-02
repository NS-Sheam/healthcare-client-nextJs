"use client";

import { Box, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";

import assets from "@/assets";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";

interface IPatientData {
  name: string;
  email: string;
  contactNumber: string;
  address: string;
}
interface IPatientRegisterFormData {
  password: string;
  patient: IPatientData;
}
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IPatientRegisterFormData>();
  const onSubmit: SubmitHandler<IPatientRegisterFormData> = (values) => {
    const data = modifyPayload(values);
    console.log(data);
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image
                src={assets.svgs.logo}
                width={50}
                height={50}
                alt="Logo"
              />
            </Box>
            <Box>
              <Typography
                variant="h6"
                fontWeight="600"
              >
                Patient Register
              </Typography>
            </Box>
          </Stack>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                spacing={2}
                my={1}
              >
                <Grid
                  item
                  md={12}
                >
                  <TextField
                    label="Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...register("patient.name")}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                >
                  <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...register("patient.email")}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                >
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...register("password")}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                >
                  <TextField
                    label="Contact Number"
                    type="tel"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...register("patient.contactNumber")}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                >
                  <TextField
                    label="Address"
                    type="text"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...register("patient.address")}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                sx={{
                  margin: "10px 0",
                }}
                type="submit"
              >
                Register
              </Button>
              <Typography
                component="p"
                fontWeight="300"
              >
                Do you already have an account? <Link href="/login">Login</Link>
              </Typography>
            </form>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
