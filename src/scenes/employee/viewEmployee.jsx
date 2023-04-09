import { useState } from "react";
import {
  Typography,
  Box,
  Button,
  useTheme,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
  TextField,
  Modal
} from "@mui/material";
import { tokens } from "../../theme";
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import AppHeader from "../../components/AppHeader";
import { useMediaQuery } from "@mui/material";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: 5,
  boxShadow: 24,
  // backdropFilter: 'blur(100px)',
  p: 4,
};

const ViewEmployee = () => {
  const cafeId = JSON.parse(localStorage.getItem("profile")).id;
  const {id} = useParams();
  const [Employee, setEmployee] = useState();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    const getApplicantData = async () => {
      const {data} = await axios.get(`http://192.168.208.132:4000/user/profile/${id}`);
      console.log(data.user[0])
      setEmployee(data.user[0]);
    };
    getApplicantData();
  }, [id]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [greenModal, setGreenModal] = useState(false);
  const [redModal, setRedModal] = useState(false);
  const [orangeModal, setOrangeModal] = useState(false);
  const [yellowModal, setYellowModal] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleRedOpen = () => {
    setRedModal(true);
  };
  const handleRedClose = () => {
    setRedModal(false);
  };
  const handleGreenOpen = () => {
    setGreenModal(true);
  };
  const handleGreenClose = () => {
    setGreenModal(false);
  };
  const handleOrangeOpen = () => {
    setOrangeModal(true);
  };
  const handleOrangeClose = () => {
    setOrangeModal(false);
  };
  const handleYellowOpen = () => {
    setYellowModal(true);
  };
  const handleYellowClose = () => {
    setYellowModal(false);
  };

  const handleRedSubmit = async(values) => {
    try{
      const formData = new FormData();
      formData.append("reason", values.reason);
      formData.append("cafeId", cafeId);
      formData.append("type", 1);
      const {data} = await axios.post(`http://192.168.208.132:4000/user/flag/${id}`, formData);
      console.log(data);
      // handleRedClose();
    }catch(error){
      console.log(error)
    }
  };
  
  const handleGreenSubmit = async(values) => {
    try{
      const formData = new FormData();
      formData.append("reason", values.reason);
      formData.append("cafeId", cafeId);
      formData.append("type", 4);
      const {data} = await axios.post(`http://192.168.208.132:4000/user/flag/${id}`, formData);
      console.log(data);
      // handleRedClose();
    }catch(error){
      console.log(error)
    }
  };

  const handleOrangeSubmit = async(values) => {
    try{
      const formData = new FormData();
      formData.append("reason", values.reason);
      formData.append("cafeId", cafeId);
      formData.append("type", 2);
      const {data} =  await axios.post(`http://192.168.208.132:4000/user/flag/${id}`, formData);
      console.log(data);
      // handleRedClose();
    }catch(error){
      console.log(error)
    }
  };

  const handleYellowSubmit = async(values) => {
    try{
      const formData = new FormData();
      formData.append("reason", values.reason);
      formData.append("cafeId", cafeId);
      formData.append("type", 3);
      const {data} = await axios.post(`http://192.168.208.132:4000/user/flag/${id}`, formData);
      console.log(data);
      // handleRedClose();
    }catch(error){
      console.log(error)
    }
  };

  // const [Employee, setEmployee] = useState({
  //   firstName: "John",
  //   lastName: "Doe",
  //   email: "john@example.com",
  //   location: "Mumbai",
  //   phone: "9783568746",
  //   address: "Somewhere Sometime something someone all at nonce",
  //   dob: "2023-02-02",
  //   zip: "400067",
  // });

  if (!Employee) {
    return null;
  }

  return (
    <>
    <Modal
        keepMounted
        open={redModal}
        onClose={handleRedClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Formik onSubmit={handleRedSubmit} initialValues={redInitValues}>
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <AppHeader
                  title="RED FLAG EMPLOYEE"
                  subtitle="Fill in the details to red flag the employee"
                />
                <Box
                  display="grid"
                  gap="1rem"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="reason"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.reason}
                    name="reason"
                    error={!!touched.reason && !!errors.reason}
                    helperText={touched.reason && errors.reason}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display="grid" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    RED FLAG
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
      <Modal
        keepMounted
        open={orangeModal}
        onClose={handleOrangeClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Formik onSubmit={handleOrangeSubmit} initialValues={orangeInitValues}>
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <AppHeader
                  title="ORANGE FLAG EMPLOYEE"
                  subtitle="Fill in the details to orange flag the employee"
                />
                <Box
                  display="grid"
                  gap="1rem"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="reason"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.reason}
                    name="reason"
                    error={!!touched.reason && !!errors.reason}
                    helperText={touched.reason && errors.reason}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display="grid" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    ORANGE FLAG
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
      <Modal
        keepMounted
        open={yellowModal}
        onClose={handleYellowClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Formik onSubmit={handleYellowSubmit} initialValues={yellowInitValues}>
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <AppHeader
                  title="YELLOW FLAG EMPLOYEE"
                  subtitle="Fill in the details to yellow flag the employee"
                />
                <Box
                  display="grid"
                  gap="1rem"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="reason"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.reason}
                    name="reason"
                    error={!!touched.reason && !!errors.reason}
                    helperText={touched.reason && errors.reason}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display="grid" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    YELLOW FLAG
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
      <Modal
        keepMounted
        open={greenModal}
        onClose={handleGreenClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Formik onSubmit={handleGreenSubmit} initialValues={greenInitValues}>
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <AppHeader
                  title="GREEN FLAG EMPLOYEE"
                  subtitle="Fill in the details to green flag the employee"
                />
                <Box
                  display="grid"
                  gap="1rem"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="reason"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.reason}
                    name="reason"
                    error={!!touched.reason && !!errors.reason}
                    helperText={touched.reason && errors.reason}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display="grid" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    GREEN FLAG
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
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
        fontSize='4rem'>
        {Employee.firstName} {Employee.lastName}
      </Typography>
      <Box
        gridRow='4'
        gridColumn='1 / -1'
        display='grid'
        gap='0.5em'
        p='0.5rem 1rem'
        backgroundColor='#243153'>
        <Typography variant='h3'>{Employee.email}</Typography>
        <Typography variant='h3'>{Employee.phone} </Typography>
        <Typography variant='body1'>{Employee.address}</Typography>
        <Typography variant='body1'>
          {Employee.location}-{Employee.zip}
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
        <Tooltip title='Green Flag' sx={{ fontSize: "1.5rem" }}>
          <Button
            onClick={handleGreenOpen}
            sx={{
              backgroundColor: colors.greenAccent["600"],
              fontWeight: "bold",
              fontSize: "1.25em",
              color: colors.primary["900"],
              "&:hover": {
                backgroundColor: colors.greenAccent["400"],
              },
            }}>
            Green
          </Button>
        </Tooltip>
        <Tooltip title='Yellow Flag' sx={{ fontSize: "1.5rem" }}>
          <Button
            onClick={handleYellowOpen}
            sx={{
              backgroundColor: colors.yellowAccent["600"],
              fontSize: "1.25em",
              fontWeight: "bold",
              color: colors.primary["900"],
              "&:hover": {
                backgroundColor: colors.yellowAccent["400"],
              },
            }}>
            Yellow
          </Button>
        </Tooltip>
        <Tooltip title='Orange Flag' sx={{ fontSize: "1.5rem" }}>
          <Button
            onClick={handleOrangeOpen}
            sx={{
              backgroundColor: colors.orangeAccent["600"],
              fontSize: "1.25em",
              fontWeight: "bold",
              color: colors.primary["900"],
              "&:hover": {
                backgroundColor: colors.orangeAccent["400"],
              },
            }}>
            Orange
          </Button>
        </Tooltip>
        <Tooltip title='Red Flag' sx={{ fontSize: "1.5rem" }}>
          <Button
            onClick={handleRedOpen}
            sx={{
              backgroundColor: colors.redAccent["600"],
              fontSize: "1.25em",
              fontWeight: "bold",
              color: colors.primary["900"],
              "&:hover": {
                backgroundColor: colors.redAccent["400"],
              },
            }}>
            Red
          </Button>
        </Tooltip>
      </Box>
    </Box>
    </>
  );
};
const redInitValues = {
  reason: "",
};
const greenInitValues = {
  reason: "",
};
const yellowInitValues = {
  reason: "",
};
const orangeInitValues = {
  reason: "",
};
export default ViewEmployee;
