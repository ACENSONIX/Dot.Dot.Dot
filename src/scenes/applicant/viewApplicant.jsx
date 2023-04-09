import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  useTheme,
  Modal,
  TextField,
  List,
  ListItem,
  Badge,
  Tooltip,
} from "@mui/material";
import { tokens } from "../../theme";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import AppHeader from "../../components/AppHeader";
import useMediaQuery from "@mui/material/useMediaQuery";
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

const ViewApplicant = () => {
  const url = "http://192.168.208.132:4000/";

  const user = JSON.parse(localStorage.getItem("profile"));
  const { id } = useParams();
  const [Applicant, setApplicant] = useState();
  const [hireOpen, setHireOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [blacklistOpen, setBlacklistOpen] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [offer, setOffer] = useState();

  const handleOfferFile = e => {
    setOffer(e.target.files[0]);
  };

  const handleHireOpen = () => {
    setHireOpen(true);
  };

  const handleHireClose = () => {
    setHireOpen(false);
  };

  const handleRejectOpen = () => {
    setRejectOpen(true);
  };

  const handleRejectClose = () => {
    setRejectOpen(false);
  };

  const handleBlacklistOpen = () => {
    setBlacklistOpen(true);
  };

  const handleBlacklistClose = () => {
    setBlacklistOpen(false);
  };

  useEffect(() => {
    const getApplicantData = async () => {
      const { data } = await axios.get(`${url}user/profile/${id}`);
      // console.log(data.user[0]);
      setApplicant(data.user[0]);
    };
    getApplicantData();
  }, [id]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const [Applicant, setApplicant] = useState({
  //   firstName: "John",
  //   lastName: "Doe",
  //   email: "john@example.com",
  //   location: "Mumbai",
  //   phone: "9783568746",
  //   address: "Somewhere Sometime something someone all at nonce",
  //   dob: "2023-02-02",
  //   zip: "400067",
  // });
  const handleHireFormSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append("offer", offer);
      formData.append("position", values.role);
      formData.append("description", values.description);
      formData.append("salary", values.salary);
      formData.append("applicantId", id);
      formData.append("cafeId", user.id);
      formData.append("company", user.name);
      formData.append("companyEmail", user.email);
      formData.append("companyContact", user.phone);
      const { data } = await axios.post(
        `http://192.168.208.132:4000/user/hire/${Applicant.id}`,
        formData
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectFormSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append("offer", offer);
      formData.append("role", values.role);
      formData.append("description", values.description);
      formData.append("salary", values.salary);
      formData.append("applicantId", id);
      formData.append("cafeId", user.id);
      formData.append("companyName", user.name);
      formData.append("companyEmail", user.email);
      formData.append("companyContact", user.phone);
      const { data } = await axios.post(
        `http://192.168.208.132:4000/user/hire/${Applicant.id}`,
        formData
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlacklistFormSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append("offer", offer);
      formData.append("role", values.role);
      formData.append("description", values.description);
      formData.append("salary", values.salary);
      formData.append("applicantId", id);
      formData.append("cafeId", user.id);
      formData.append("companyName", user.name);
      formData.append("companyEmail", user.email);
      formData.append("companyContact", user.phone);
      const { data } = await axios.post(
        `http://192.168.208.132:4000/user/hire/${Applicant.id}`,
        formData
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!Applicant) return null;
  else console.log(Applicant);

  return (
    <>
      <Modal
        keepMounted
        open={hireOpen}
        onClose={handleHireClose}
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'>
        <Box sx={style}>
          <Formik onSubmit={handleHireFormSubmit} initialValues={initialValues}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <AppHeader
                  error='Congratulations!'
                  title='HIRE NEW APPLICANT'
                  subtitle='Fill in the details to hire the applicant'
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
                    label='Role'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.role}
                    name='role'
                    error={!!touched.role && !!errors.role}
                    helperText={touched.role && errors.role}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant='filled'
                    type='text'
                    label='Description'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name='description'
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant='filled'
                    type='text'
                    label='Salary'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.salary}
                    name='salary'
                    error={!!touched.salary && !!errors.salary}
                    helperText={touched.salary && errors.salary}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <Button
                    variant='filled'
                    fullWidth
                    component='label'
                    style={{ backgroundColor: "#323848a0" }}
                    value={offer}
                    onChange={e => handleOfferFile(e)}
                    sx={{ gridColumn: "span 2" }}>
                    <Typography variant='h5'>
                      {offer ? offer.name : "Upload Offer Letter"}
                    </Typography>
                    <input hidden type='file' />
                  </Button>
                </Box>
                <Box display='grid' mt='20px'>
                  <Button type='submit' color='secondary' variant='contained'>
                    Hire Applicant
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
      <Modal
        keepMounted
        open={rejectOpen}
        onClose={handleRejectClose}
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'>
        <Box sx={style}>
          <Formik onSubmit={handleRejectFormSubmit} initialValues={rejectInitValues}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <AppHeader
                  error='Are you sure about rejection ??'
                  title='REJECT APPLICANT'
                  subtitle='Fill in the details to reject the applicant'
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
                    Reject Applicant
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
      <Modal
        keepMounted
        open={blacklistOpen}
        onClose={handleBlacklistClose}
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'>
        <Box sx={style}>
          <Formik onSubmit={handleBlacklistFormSubmit} initialValues={blacklistInitValues}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <AppHeader
                  title='BLACKLIST APPLICANT'
                  subtitle='Fill in the details to blacklist the applicant'
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
                    Blacklist Applicant
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
        <img className='cover-image' src='http://unsplash.it/1600/400' alt='cover' />

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
          <img src={`${url}${Applicant.image}`} alt='profile' />
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
          {Applicant.firstName} {Applicant.lastName}
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
            <Typography variant='body1'>{Applicant.phone}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <EmailOutlinedIcon sx={{ color: colors.grey[100], mr: 1 }} />
            <Typography variant='body1'>{Applicant.email}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <PinDropOutlinedIcon sx={{ color: colors.grey[100], mr: 1 }} />
            <Typography variant='body1'>
              {Applicant.location} - {Applicant.zip}
            </Typography>
          </Box>
        </Box>
        <Box
          display='grid'
          gridTemplateColumns='1fr 1fr'
          gridColumn='1 / -1'
          gap='2rem'
          padding='1rem'>
          {Applicant.aadhar && (
            <Box>
              <img
                src={`${url}${Applicant.aadhar}`}
                alt='aadhar card'
                width='100%'
                style={{ borderRadius: "1rem" }}
              />
            </Box>
          )}
          {Applicant.pan && (
            <Box>
              <img
                src={`${url}${Applicant.pan}`}
                alt='pan card'
                width='100%'
                style={{ borderRadius: "1rem" }}
              />
            </Box>
          )}
        </Box>

        {Applicant.works?.length ? (
          <Box gridColumn='1 / -1' padding='1rem'>
            <Typography variant='h2'>Work History</Typography>
            <Box>
              {Applicant.works.map((work, i) => (
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
          gridRow='-1'
          padding='1rem'
          backgroundColor='rgba(0 0 0 / 0.7)'
          sx={{ backdropFilter: "blur(20px)" }}>
          <Button
            onClick={() => setHireOpen(true)}
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
            onClick={() => setRejectOpen(true)}
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
            to='/dashboard/add-applicant'
            component={Link}
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
            onClick={() => setBlacklistOpen(true)}
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
    </>
  );
};

const initialValues = {
  role: "",
  description: "",
  salary: "",
};

const rejectInitValues = {
  reason: "",
};

const blacklistInitValues = {
  reason: "",
};

export default ViewApplicant;
