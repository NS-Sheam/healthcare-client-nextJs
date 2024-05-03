"use client";
import { getUserInfo, isLoggedIn } from "@/services/auth.services";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
  const userInfo = getUserInfo();
  console.log(userInfo);

  return (
    <Container>
      <Stack
        py={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h4"
          component={Link}
          href="/"
          fontWeight={600}
        >
          <Box
            component="span"
            color="primary.main"
          >
            H
          </Box>
          ealth Care
        </Typography>
        <Stack
          direction="row"
          gap={4}
          justifyContent="space-between"
        >
          <Typography
            component={Link}
            href="/consultation"
          >
            Consultation
          </Typography>
          <Typography>Health Plans</Typography>
          <Typography>Medicine</Typography>
          <Typography>Diagnostics</Typography>
          <Typography>NGOs</Typography>
        </Stack>
        {userInfo?.userId ? (
          <Button
            component={Link}
            color="error"
            href="/logout"
          >
            Logout
          </Button>
        ) : (
          <Button
            component={Link}
            href="/login"
          >
            Login
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default Navbar;
