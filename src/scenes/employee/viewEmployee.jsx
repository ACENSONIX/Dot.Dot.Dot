import { useState } from "react";
import {
  Typography,
  Box,
  Button,
  useTheme,
  Tooltip,
  TextField,
  Modal,
  List,
  ListItem,
  Badge,
} from "@mui/material";
import { tokens } from "../../theme";
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import AppHeader from "../../components/AppHeader";
import { useMediaQuery } from "@mui/material";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";

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
  const { id } = useParams();
  const [Employee, setEmployee] = useState();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const url = "http://192.168.208.132:4000/";

  useEffect(() => {
    const getEmployeeData = async () => {
      const { data } = await axios.get(`${url}user/profile/${id}`);
      console.log(data.user[0]);
      setEmployee(data.user[0]);
    };
    getEmployeeData();
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

  const handleRedSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append("reason", values.reason);
      formData.append("cafeId", cafeId);
      formData.append("type", 1);
      const { data } = await axios.post(`http://192.168.208.132:4000/user/flag/${id}`, formData);
      console.log(data);
      // handleRedClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGreenSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append("reason", values.reason);
      formData.append("cafeId", cafeId);
      formData.append("type", 4);
      const { data } = await axios.post(`http://192.168.208.132:4000/user/flag/${id}`, formData);
      console.log(data);
      // handleRedClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrangeSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append("reason", values.reason);
      formData.append("cafeId", cafeId);
      formData.append("type", 2);
      const { data } = await axios.post(`http://192.168.208.132:4000/user/flag/${id}`, formData);
      console.log(data);
      // handleRedClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleYellowSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append("reason", values.reason);
      formData.append("cafeId", cafeId);
      formData.append("type", 3);
      const { data } = await axios.post(`http://192.168.208.132:4000/user/flag/${id}`, formData);
      console.log(data);
      // handleRedClose();
    } catch (error) {
      console.log(error);
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
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'>
        <Box sx={style}>
          <Formik onSubmit={handleRedSubmit} initialValues={redInitValues}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <AppHeader
                  title='RED FLAG EMPLOYEE'
                  subtitle='Fill in the details to red flag the employee'
                />
                <Box
                  display='grid'
                  gap='1rem'
                  gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}>
                  <TextField
                    fullWidth
                    variant='filled'
                    type='text'
                    label='reason'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.reason}
                    name='reason'
                    error={!!touched.reason && !!errors.reason}
                    helperText={touched.reason && errors.reason}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display='grid' mt='20px'>
                  <Button type='submit' color='secondary' variant='contained'>
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
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'>
        <Box sx={style}>
          <Formik onSubmit={handleOrangeSubmit} initialValues={orangeInitValues}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <AppHeader
                  title='ORANGE FLAG EMPLOYEE'
                  subtitle='Fill in the details to orange flag the employee'
                />
                <Box
                  display='grid'
                  gap='1rem'
                  gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}>
                  <TextField
                    fullWidth
                    variant='filled'
                    type='text'
                    label='reason'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.reason}
                    name='reason'
                    error={!!touched.reason && !!errors.reason}
                    helperText={touched.reason && errors.reason}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display='grid' mt='20px'>
                  <Button type='submit' color='secondary' variant='contained'>
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
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'>
        <Box sx={style}>
          <Formik onSubmit={handleYellowSubmit} initialValues={yellowInitValues}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <AppHeader
                  title='YELLOW FLAG EMPLOYEE'
                  subtitle='Fill in the details to yellow flag the employee'
                />
                <Box
                  display='grid'
                  gap='1rem'
                  gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}>
                  <TextField
                    fullWidth
                    variant='filled'
                    type='text'
                    label='reason'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.reason}
                    name='reason'
                    error={!!touched.reason && !!errors.reason}
                    helperText={touched.reason && errors.reason}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display='grid' mt='20px'>
                  <Button type='submit' color='secondary' variant='contained'>
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
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'>
        <Box sx={style}>
          <Formik onSubmit={handleGreenSubmit} initialValues={greenInitValues}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <AppHeader
                  title='GREEN FLAG EMPLOYEE'
                  subtitle='Fill in the details to green flag the employee'
                />
                <Box
                  display='grid'
                  gap='1rem'
                  gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}>
                  <TextField
                    fullWidth
                    variant='filled'
                    type='text'
                    label='reason'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.reason}
                    name='reason'
                    error={!!touched.reason && !!errors.reason}
                    helperText={touched.reason && errors.reason}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display='grid' mt='20px'>
                  <Button type='submit' color='secondary' variant='contained'>
                    GREEN FLAG
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
      <Box
        p='1rem 0 5rem'
        display='grid'
        gap='0 2em'
        height='100%'
        gridTemplateRows='5rem 5rem auto auto 1fr 1fr auto'
        gridTemplateColumns='repeat(15,1fr)'>
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
        <Box
          backgroundColor='#243153'
          gridRow='3 / span 2'
          gridColumn='1 / -1'
          gap='0 2em'
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(15,1fr)",
            borderRadius: "0 0 2rem 2rem",
            zIndex: -1,
          }}></Box>

        <Typography
          variant='h1'
          color={colors.grey[100]}
          fontWeight='bold'
          gridColumn='4 / -1'
          gridRow='3'
          fontSize='3rem'>
          {Employee.firstName} {Employee.lastName}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridAutoFlow: "column",
            gridColumn: "1 / -1",
            gridRow: "4",
            justifyContent: "space-around",
            padding: "2em 1em ",
          }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <CallOutlinedIcon sx={{ color: colors.grey[100], mr: 1 }} />
            <Typography variant='body1'>{Employee.phone}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <EmailOutlinedIcon sx={{ color: colors.grey[100], mr: 1 }} />
            <Typography variant='body1'>{Employee.email}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <PinDropOutlinedIcon sx={{ color: colors.grey[100], mr: 1 }} />
            <Typography variant='body1'>
              {Employee.location} - {Employee.zip}
            </Typography>
          </Box>
        </Box>

        <Box
          display='grid'
          gridTemplateColumns='1fr 1fr'
          gridColumn='1 / -1'
          gap='2rem'
          padding='1rem'>
          {Employee.aadhar && (
            <Box>
              <img
                src={`${url}${Employee.aadhar}`}
                alt='aadhar card'
                width='100%'
                style={{ borderRadius: "1rem" }}
              />
            </Box>
          )}
          {Employee.pan && (
            <Box>
              <img
                src={`${url}${Employee.pan}`}
                alt='pan card'
                width='100%'
                style={{ borderRadius: "1rem" }}
              />
            </Box>
          )}
        </Box>
        {Employee.works?.length ? (
          <Box gridColumn='1 / -1' padding='1rem'>
            <Typography variant='h2'>Work History</Typography>
            <Box>
              {Employee.works.map((work, i) => (
                <Box key={i}>
                  <Typography variant='h4'>{work.cafe.name}</Typography>
                  <List sx={{ display: "flex" }}>
                    {work.flags.map((flag, i) => (
                      <ListItem sx={{ display: "inline-block" }}>
                        <Tooltip title={flag.description}>
                          <Badge
                            sx={{
                              backgroundColor: flag.type,
                              padding: "0.25em 0.5em",
                              borderRadius: "0.25em",
                            }}
                            key={i}>
                            {flag.reason}
                          </Badge>
                        </Tooltip>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </Box>
          </Box>
        ) : null}

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
          sx={{ backdropFilter: "blur(20px)" }}>
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
