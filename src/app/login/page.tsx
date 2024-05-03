"use client";
import { Box, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    // console.log(values);
    try {
      const res = await userLogin(values);
      if (res?.data?.accessToken) {
        toast.success(res?.message || "Login Successful");
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/");
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
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                spacing={2}
                my={1}
              >
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
                    {...register("email")}
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
            </form>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
