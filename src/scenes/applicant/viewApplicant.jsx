import { useState } from "react";
import { Typography, Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const ViewApplicant = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [Applicant, setApplicant] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    location: "Mumbai",
    phone: "9783568746",
    address: "Somewhere Sometime something someone all at nonce",
    dob: "2023-02-02",
    zip: "400067",
  });

  return (
    <Box
      p='1rem 0'
      display='grid'
      gap='1em 2em'
      gridTemplateColumns='repeat(15,1fr)'
      position='relative'>
      <img class='cover-image' src='http://unsplash.it/1600/400' alt='cover' />

      <Box
        borderRadius='50%'
        width='10rem'
        height='10rem'
        border='4px solid #fff'
        gridRow='2 / span 2'
        gridColumn='2 / span 2'
        backgroundColor='#141b2d'
        sx={{
          "&>img": { width: "100%", height: "100%", aspectRatio: "1/1", borderRadius: "50%" },
        }}>
        <img src='http://unsplash.it/200/200' alt='profile' />
      </Box>
      <Typography
        variant='h1'
        color={colors.grey[100]}
        fontWeight='bold'
        gridColumn='4 / -1'
        gridRow='3'
        fontSize='3rem'>
        {Applicant.firstName} {Applicant.lastName}
      </Typography>

      <Box
        gridRow='4'
        gridColumn='1 / -1'
        display='grid'
        gap='0.5em'
        p='0.5rem 1rem'
        backgroundColor='#243153'>
        <Typography variant='h3'>{Applicant.email}</Typography>
        <Typography variant='h3'>{Applicant.phone} </Typography>
        <Typography variant='body1'>{Applicant.address}</Typography>
        <Typography variant='body1'>
          {Applicant.location}-{Applicant.zip}
        </Typography>
      </Box>

      <Box
        position='sticky'
        bottom='0'
        gridAutoFlow='column'
        display='grid'
        gridAutoColumns='1fr'
        gap='1rem'
        gridColumn='1 / -1'
        gridRow='100'
        padding='1rem'
        backgroundColor='rgba(0 0 0 / 0.7)'
        backdropFilter='blur(20px)'>
        <Button
          sx={{
            backgroundColor: colors.greenAccent["600"],
            fontWeight: "bold",
            fontSize: "1.25em",
            color: colors.primary["900"],
            "&:hover": {
              backgroundColor: colors.greenAccent["400"],
            },
          }}>
          Hire
        </Button>
        <Button
          sx={{
            backgroundColor: colors.redAccent["600"],
            fontSize: "1.25em",
            fontWeight: "bold",
            color: colors.primary["900"],
            "&:hover": {
              backgroundColor: colors.redAccent["400"],
            },
          }}>
          Reject
        </Button>
        <Button
          sx={{
            backgroundColor: colors.blueAccent["600"],
            fontSize: "1.25em",
            fontWeight: "bold",
            color: colors.primary["900"],
            "&:hover": {
              backgroundColor: colors.blueAccent["400"],
            },
          }}>
          Re-Verify
        </Button>
        <Button
          sx={{
            backgroundColor: colors.grey["600"],
            fontSize: "1.25em",
            fontWeight: "bold",
            color: colors.primary["900"],
            "&:hover": {
              backgroundColor: colors.grey["400"],
            },
          }}>
          Blacklist
        </Button>
      </Box>
    </Box>
  );
};
export default ViewApplicant;
