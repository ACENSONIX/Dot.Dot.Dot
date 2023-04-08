import { Typography, Box, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import { Link } from "react-router-dom";

const ApplicantHeader = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
    <Box mb="30px" >
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
    <Box>
        <Link to="/dashboard/add-applicant" style={{textDecoration
        :'none'
        }}>
        <Button variant="contained" color="secondary" sx={{mr:'10px'}}>
            <Typography variant="h5" color={colors.grey[100]}>
            Add Applicant
            </Typography>
            </Button>
        </Link>
    </Box>
    </Box>
  );
};

export default ApplicantHeader;
