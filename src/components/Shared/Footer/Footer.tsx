import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import facebookIcon from "@/assets/landing_page/facebook.png";

const Footer = () => {
  return (
    <Box bgcolor="rgb(17, 26, 34)">
      <Container>
        <Stack
          direction="row"
          gap={4}
          justifyContent="center"
        >
          <Typography
            component={Link}
            href="/consultation"
            color="#fff"
          >
            Consultation
          </Typography>
          <Typography color="#fff">Health Plans</Typography>
          <Typography color="#fff">Medicine</Typography>
          <Typography color="#fff">Diagnostics</Typography>
          <Typography color="#fff">NGOs</Typography>
        </Stack>
        <Stack
          direction="row"
          gap={2}
          justifyContent="center"
          py={3}
        >
          <Image
            src={facebookIcon}
            alt="facebook"
            width={30}
            height={30}
          />
          <Image
            src={facebookIcon}
            alt="facebook"
            width={30}
            height={30}
          />
          <Image
            src={facebookIcon}
            alt="facebook"
            width={30}
            height={30}
          />
          <Image
            src={facebookIcon}
            alt="facebook"
            width={30}
            height={30}
          />
        </Stack>
        <div className="border-b-[1px] border-dashed"></div>
        <Stack
          direction="row"
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          py={3}
        >
          <Typography
            component="p"
            color="#fff"
          >
            @copy; 2024 Health Care All Rights Reserved
          </Typography>
          <Typography
            variant="h4"
            component={Link}
            href="/"
            fontWeight={600}
            color="#fff"
          >
            <Box
              component="span"
              color="primary.main"
            >
              H
            </Box>
            ealth Care
          </Typography>
          <Typography
            component="p"
            color="#fff"
          >
            Privacy Policy | Terms of Use
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
