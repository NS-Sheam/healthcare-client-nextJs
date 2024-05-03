"use client";
import { getUserInfo, isLoggedIn, removeUserInfo } from "@/services/auth.services";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const userInfo = getUserInfo();
  const router = useRouter();
  const handleLogout = () => {
    removeUserInfo();
    router.refresh();
  };

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
            color="error"
            onClick={handleLogout}
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
