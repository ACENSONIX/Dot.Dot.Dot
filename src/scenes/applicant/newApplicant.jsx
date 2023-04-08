import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [image, setImage] = useState({});

  const handleFormSubmit = values => {
    console.log(values);
  };
  const handleImageFile = e => {
    setImage({ [e.target.name]: e.target.files[0], ...image });
  };

  return (
    <Box display='grid' sx={{ placeItems: "center" }}>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Header title='SIGN UP APPLICANT' subtitle='Register a new Applicant Profile' />
            <Box
              display='grid'
              gap='1rem'
              gridTemplateColumns='repeat(4, minmax(0, 1fr))'
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}>
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name='name'
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name='email'
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Contact Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name='contact'
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Address'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name='address'
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Pincode'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pincode}
                name='pincode'
                error={!!touched.pincode && !!errors.pincode}
                helperText={touched.pincode && errors.pincode}
                sx={{ gridColumn: "span 1" }}
              />

              <Button
                variant='contained'
                fullWidth
                component='label'
                style={{ gridColumn: "span 2", backgroundColor: "#323848a0" }}
                value={image.pan}
                onChange={handleImageFile}>
                {image.pan ? image.pan.name : "Upload PAN"}
                <input hidden accept='image/*' type='file' name='pan' />
              </Button>

              <Button
                variant='contained'
                fullWidth
                component='label'
                style={{ gridColumn: "span 2", backgroundColor: "#323848a0" }}
                value={image.aadhaar}
                onChange={handleImageFile}>
                {image.aadhaar ? image.aadhaar.name : "Upload Aadhaar"}
                <input hidden accept='image/*' type='file' name='aadhaar' />
              </Button>

              {/* <TextField
                fullWidth
                variant='filled'
                type='text'
                label='PAN Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pan}
                name='pan'
                error={!!touched.pan && !!errors.pan}
                helperText={touched.pan && errors.pan}
                sx={{ gridColumn: "span 2" }}
              /> */}
            </Box>
            <Box display='grid' mt='20px'>
              <Button type='submit' color='secondary' variant='contained'>
                Sign up
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required"),
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
