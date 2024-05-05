"use client";

import { Box, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";

import assets from "@/assets";
import Link from "next/link";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const patientValidatonSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  contactNumber: z
    .string({
      required_error: "Contact number is required",
    })
    .regex(/^\d{11}$/, "Invalid contact number"),
  address: z.string({
    required_error: "Address is required",
  }),
});

const registerValidatonSchema = z.object({
  patient: patientValidatonSchema,
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
});

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    const data = modifyPayload(values);
    // console.log(data);
    try {
      const res = await registerPatient(data);
      // console.log(res);
      if (res?.data?.id) {
        toast.success(res?.message || "Patient registered successfully");
        const result = await userLogin({ password: values.password, email: values.patient.email });
        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/");
        }
      }
    } catch (error: any) {
      console.error(error.message);
    }
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
            <PHForm
              onSubmit={handleRegister}
              resolver={zodResolver(registerValidatonSchema)}
            >
              <Grid
                container
                spacing={2}
                my={1}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Grid
                  item
                  md={12}
                >
                  <PHInput
                    name="patient.name"
                    label="Name"
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                >
                  <PHInput
                    name="patient.email"
                    label="Email"
                    type="email"
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                >
                  <PHInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                >
                  <PHInput
                    name="patient.contactNumber"
                    label="Contact Number"
                    type="tel"
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                >
                  <PHInput
                    name="patient.address"
                    label="Address"
                    type="text"
                    fullWidth
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
            </PHForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
