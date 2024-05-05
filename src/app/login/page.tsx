"use client";
import { Box, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const loginValidationSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (values: FieldValues) => {
    // console.log(values);
    try {
      const res = await userLogin(values);
      if (res?.data?.accessToken) {
        toast.success(res?.message || "Login Successful");
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/");
      } else {
        setError(res?.message || "Login failed");
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
                Login Health Care
              </Typography>
            </Box>
          </Stack>
          {error && (
            <Box>
              <Typography
                component="p"
                sx={{
                  backgroundColor: "error.light",
                  color: "#ffffff",
                  padding: "1px",
                  borderRadius: "2px",
                  marginTop: "5px",
                }}
              >
                {error}
              </Typography>
            </Box>
          )}
          <Box>
            <PHForm
              onSubmit={handleLogin}
              resolver={zodResolver(loginValidationSchema)}
              defaultValues={{
                email: "",
                password: "",
              }}
            >
              <Grid
                container
                spacing={2}
                my={1}
              >
                <Grid
                  item
                  md={6}
                >
                  <PHInput
                    name="email"
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
              </Grid>
              <Typography
                mb={1}
                component="p"
                fontWeight="300"
                textAlign="end"
              >
                Forgot Password?
              </Typography>

              <Button
                fullWidth
                sx={{
                  margin: "10px 0",
                }}
                type="submit"
              >
                Login
              </Button>
              <Typography
                component="p"
                fontWeight="300"
              >
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  Create an account
                </Link>
              </Typography>
            </PHForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
