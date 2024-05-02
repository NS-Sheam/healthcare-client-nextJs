import { Box, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
const LoginPage = () => {
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
            <form>
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
