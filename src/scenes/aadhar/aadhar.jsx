import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import ApplicantHeader from "../../components/ApplicantHeader";
import Header from "../../components/Header";
import AppHeader from "../../components/AppHeader";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  verifyApplicant,
  addApplicant,
  applicant
} from "../../actions/applicants/applicants";
import axios from "axios";

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

const Aadhar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [image, setImage] = useState({});
  const [photo, setPhoto] = useState();

  const [pan, setPan] = useState();
  const [aadhar, setAadhar] = useState();

  const handleImageFile = (e) => {
    setImage({ [e.target.name]: e.target.files[0], ...image });
  };
  const handlePhotoFile = (e) => {
    setPhoto(e.target.files[0]);
  };
  const handleAadharFile = (e) => {
    setAadhar(e.target.files[0]);
  };
  const handlePanFile = (e) => {
    setPan(e.target.files[0]);
  };

  const [open, setOpen] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePhotoSubmit = async (e, values) => {
    try {
      e.preventDefault();
      let formData = new FormData();
      console.log(photo);
      formData.append("image", photo);
      const { data } = await axios.post(
        "http://192.168.208.132:4000/user/search",
        formData
      );
      console.log(data);
      if (data.user === null) {
        setOpen(true);
      } else {
        console.log(data.user);
        navigate(`/dashboard/view-applicant/${data.user.id}`, {
          state: {
            user: data.user,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (values) => {
    console.log(values);
    try {
      let applicantForm = new FormData();
      applicantForm.append("firstName", values.firstname);
      applicantForm.append("lastName", values.lastname);
      applicantForm.append("email", values.email);
      applicantForm.append("phone", values.contact);
      applicantForm.append("dob", values.dob);
      applicantForm.append("location", values.location);
      applicantForm.append("address", values.address);
      applicantForm.append("pincode", values.pincode);
      applicantForm.append("password", values.password);
      applicantForm.append("aadhar", aadhar);
      applicantForm.append("pan", pan);
      applicantForm.append("image", photo);
      dispatch(addApplicant(applicantForm));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
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
                  error="Sorry no user found !!"
                  title="REGISTER NEW APPLICANT"
                  subtitle="Register an applicant on our system"
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
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstname}
                    name="firstname"
                    error={!!touched.firstname && !!errors.firstname}
                    helperText={touched.firstname && errors.firstname}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastname}
                    name="lastname"
                    error={!!touched.lastname && !!errors.lastname}
                    helperText={touched.lastname && errors.lastname}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Contact Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.contact}
                    name="contact"
                    error={!!touched.contact && !!errors.contact}
                    helperText={touched.contact && errors.contact}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Date of Birth"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.dob}
                    name="dob"
                    error={!!touched.dob && !!errors.dob}
                    helperText={touched.dob && errors.dob}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="location"
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={!!touched.location && !!errors.location}
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    name="address"
                    error={!!touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
                    sx={{ gridColumn: "span 3" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Pincode"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.pincode}
                    name="pincode"
                    error={!!touched.pincode && !!errors.pincode}
                    helperText={touched.pincode && errors.pincode}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Confirm Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    error={
                      !!touched.confirmPassword && !!errors.confirmPassword
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    sx={{ gridColumn: "span 2" }}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    component="label"
                    style={{ backgroundColor: "#323848a0" }}
                    value={aadhar}
                    onChange={(e) => handleAadharFile(e)}
                    sx={{ gridColumn: "span 2" }}
                  >
                    <Typography variant="h5">
                      {aadhar ? aadhar.name : "Upload Aadhar"}
                    </Typography>
                    <input hidden accept="image/*" type="file" />
                  </Button>

                  <Button
                    variant="contained"
                    fullWidth
                    component="label"
                    style={{ backgroundColor: "#323848a0" }}
                    value={pan}
                    onChange={(e) => handlePanFile(e)}
                    sx={{ gridColumn: "span 2" }}
                  >
                    <Typography variant="h5">
                      {pan ? pan.name : "Upload Pan"}
                    </Typography>
                    <input hidden accept="image/*" type="file" />
                  </Button>
                </Box>
                <Box display="grid" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Register Applicant
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Header
          title="VIEW AADHAR DETAILS"
          subtitle="Search applicant details using aadhar card"
        />
        {/* {
        photo.image ? 
        (
            <Box
        borderRadius='50%'
        width='30rem'
        height='30rem'
        border='4px solid #fff'
        gridRow='2 / span 2'
        gridColumn='2 / span 2'
        sx={{
          "&>img": { width: "100%", height: "100%", aspectRatio: "1/1", borderRadius: "50%" },
          mt:3
        }}>
        <img src={photo.image} alt='upload photo' />
      </Box>
        ) : null
      } */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "600px",
            mt: 5,
          }}
        >
          <form
            onSubmit={handlePhotoSubmit}
            style={{ width: "100%", maxWidth: "100%" }}
          >
            <Button
              variant="contained"
              fullWidth
              component="label"
              style={{ backgroundColor: "#323848a0" }}
              value={photo}
              onChange={(e) => handlePhotoFile(e)}
            >
              <Typography variant="h5">
                {photo ? photo.name : "Upload Image"}
              </Typography>
              <input hidden accept="image/*" type="file" />
            </Button>
            <Box display="grid" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                <Typography variant="h5">Search</Typography>
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// const checkoutSchema = yup.object().shape({
//   firstName: yup.string().required("required"),
//   lastName: yup.string().required("required"),
//   email: yup.string().email("invalid email").required("required"),
//   contact: yup
//     .string()
//     .matches(phoneRegExp, "Phone number is not valid")
//     .required("required"),
//   address1: yup.string().required("required"),
//   address2: yup.string().required("required"),
// });
const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  contact: "",
  dob: "",
  location: "",
  address: "",
  pincode: "",
  password: "",
  confirmPassword: "",
  pincode: "",
};

export default Aadhar;
