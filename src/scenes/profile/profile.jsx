import {useState} from "react";
import {
  GoogleMap,
  MarkerF,
  LoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { Typography, Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";



const Profile = () => {

    const mapStyles = {
        height: "88vh",
        width: "90%",
      };
      
      const [defaultCenter, setDeafultCenter] = useState({
        lat: 19.1078,
        lng: 72.8371,
      });
      
    const handleMarkerClick = () => {
      };
    
      const handleInfoWindowClose = (id) => {
       
      };

  const user = JSON.parse(localStorage.getItem("profile"));

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
    <>
      <Box
        p="1rem 0"
        display="grid"
        gap="0 2em"
        gridTemplateColumns="repeat(15,1fr)"
        position="relative"
      >
        <img
          class="cover-image"
          src="http://unsplash.it/1600/400"
          alt="cover"
        />

        <Box
          borderRadius="50%"
          width="10rem"
          height="10rem"
          border="4px solid #fff"
          gridRow="2 / span 2"
          gridColumn="2 / span 2"
          backgroundColor="#141b2d"
          sx={{
            "&>img": {
              width: "100%",
              height: "100%",
              aspectRatio: "1/1",
              borderRadius: "50%",
            },
            position: "relative",
          }}
        >
          <img src="http://unsplash.it/200/200" alt="profile" />
        </Box>
        <Typography
          backgroundColor="#243153"
          variant="h1"
          color={colors.grey[100]}
          fontWeight="bold"
          gridColumn="1 / -1"
          gridRow="3"
          fontSize="3rem"
          sx={{ textAlign: "start", pl: 30 }}
        >
          {user.name}
        </Typography>
        <Typography
          variant="h3"
          gridColumn="1 / -1"
          backgroundColor="#243153"
          gridRow="4"
          sx={{ textAlign: "start", pl: 30 }}
        >
          {user.owner}
        </Typography>
        <Box
          backgroundColor="#243153"
          gridRow="5"
          gridColumn="1 / -1"
          gap="0.5em"
          p="0.5rem 1rem"
          sx={{
            display: "grid",
            gridAutoFlow: "column",
            pl: 30,
            pb: 5,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <CallOutlinedIcon sx={{ color: colors.grey[100], mr: 1 }} />
            <Typography variant="body1">{user.phone} </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <EmailOutlinedIcon sx={{ color: colors.grey[100], mr: 1 }} />
            <Typography variant="body1">{user.email} </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <PinDropOutlinedIcon sx={{ color: colors.grey[100], mr: 1 }} />
            <Typography variant="body1">{user.zip} </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <LoadScript googleMapsApiKey="AIzaSyBJW5dQc0jq1gajvy7MkH1JmxYRgHgCTk4">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={4}
            center={defaultCenter}
          >
            <MarkerF position={defaultCenter} />
          </GoogleMap>
        </LoadScript>
      </Box>
    </>
  );
};
export default Profile;
