"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";

const AuthButton = dynamic(() => import("@/components/UI/AuthButton/AuthButton"), { ssr: false });

const Navbar = () => {
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
        <AuthButton />
      </Stack>
    </Container>
  );
};

export default Navbar;
