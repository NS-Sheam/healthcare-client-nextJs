import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";

const HeroSection = () => {
  return (
    <Container
      sx={{
        display: "flex",
        direction: "row",
        my: 16,
      }}
    >
      <Box
        sx={{
          flex: 1,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "700px",
            top: "-90px",
            left: "-120px",
          }}
        >
          <Image
            src={assets.svgs.grid}
            alt="grid"
          />
        </Box>
        <Typography
          variant="h3"
          component="h1"
        >
          Healthier Hearts
        </Typography>
        <Typography
          variant="h3"
          component="h1"
        >
          Comes From
        </Typography>
        <Typography
          variant="h3"
          component="h1"
          color="primary.main"
          fontWeight={600}
        >
          Preventive Care
        </Typography>
        <Typography
          variant="h6"
          component="p"
          fontWeight={400}
          sx={{
            width: "50%",
          }}
        >
          lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit, amet consectetur adipisicing
          elit.
        </Typography>
        <Button>Make Appointment</Button>
        <Button
          variant="outlined"
          sx={{
            marginLeft: "5px",
          }}
        >
          Make Appointment
        </Button>
      </Box>
      <Box>Right</Box>
    </Container>
  );
};

export default HeroSection;
