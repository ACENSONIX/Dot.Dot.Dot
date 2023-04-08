import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    borderRadius: 5,
    boxShadow: 24,
    // backdropFilter: 'blur(100px)',
    p: 4,
  };

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [image, setImage] = useState({});
  const [photo, setPhoto] = useState({});

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const handlePhotoSubmit = (values) => {
    console.log(photo);
  };
  const handleImageFile = (e) => {
    setImage({ [e.target.name]: e.target.files[0], ...image });
  };
  const handlePhotoFile = (e) => {
    setPhoto({ [e.target.name]: e.target.files[0], ...photo });
  };

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(photo);

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
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Header
              title="REGISTER NEW APPLICANT"
              subtitle="Register an applicant on our system"
            />
            <Box
              display="grid"
              gap="1rem"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
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

              <Button
                variant="contained"
                fullWidth
                component="label"
                style={{ gridColumn: "span 2", backgroundColor: "#323848a0" }}
                value={image.pan}
                onChange={handleImageFile}
              >
                {image.pan ? image.pan.name : "Upload PAN"}
                <input hidden accept="image/*" type="file" name="pan" />
              </Button>

              <Button
                variant="contained"
                fullWidth
                component="label"
                style={{ gridColumn: "span 2", backgroundColor: "#323848a0" }}
                value={image.aadhaar}
                onChange={handleImageFile}
              >
                {image.aadhaar ? image.aadhaar.name : "Upload Aadhaar"}
                <input hidden accept="image/*" type="file" name="aadhaar" />
              </Button>
            </Box>
            <Box display="grid" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Sign up
              </Button>
            </Box>
          </form>
        )}
      </Formik>
        </Box>
      </Modal>
    <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
      <Header
        title="VERIFY APPLICANT"
        subtitle="Verify an applicant using our system"
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
      <Box sx={{ display: "flex", flexDirection: "column", width:'100%', maxWidth:'600px', mt:5 }}>
        <form onSubmit={handlePhotoSubmit} style={{width:'100%', maxWidth:'100%'}}>
          <Button
            variant="contained"
            fullWidth
            component="label"
            style={{ gridColumn: "span 2", backgroundColor: "#323848a0" }}
            value={photo.photo}
            name="photo"
            onChange={handlePhotoFile}
          >
            <Typography variant="h5">
            {photo.image ? photo.image : "Upload Photo"}
            </Typography>
            <input hidden accept="image/*" type="file" name="image" />
          </Button>
          <Box display="grid" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
            <Typography variant="h5">
            Verify
            </Typography>
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

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default Form;
