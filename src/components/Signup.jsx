import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../actions/owner/owner";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [image, setImage] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = values => {
    console.log({ values, image });
    try{
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("owner", values.owner);
      formData.append("email", values.email);
      formData.append("phone", values.contact);
      formData.append("address", values.address);
      formData.append("zip", values.pincode);
      formData.append("gstNo", values.gst);
      formData.append("pan", image);
      formData.append("password", values.password);
      dispatch(register(formData, navigate));
    }catch(err){
      console.log(err);
    }
  };

  const handleImageFile = e => {
    setImage(e.target.files[0], "$$$$");
  };

  return (
    <Box display='grid' sx={{ placeItems: "center", height: "100%" }}>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Header title='SIGN UP' subtitle='Register for a New User Profile' />
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
                label='Owner'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.owner}
                name='owner'
                error={!!touched.owner && !!errors.owner}
                helperText={touched.owner && errors.owner}
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
                type='tel'
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

              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='GSTIN Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gst}
                name='gst'
                error={!!touched.gst && !!errors.gst}
                helperText={touched.gst && errors.gst}
                sx={{ gridColumn: "span 3" }}
              />
              <Button
                variant='contained'
                fullWidth
                component='label'
                style={{ gridColumn: "span 1", backgroundColor: "#323848a0" }}
                value={image}
                onChange={e => handleImageFile(e)}>
                {image ? image.name : "Upload PAN"}
                <input hidden accept='image/*' type='file' />
              </Button>

              <TextField
                fullWidth
                variant='filled'
                type='password'
                label='Password'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name='password'
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='password'
                label='Confirm Password'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password_confirm}
                name='password_confirm'
                error={!!touched.password_confirm && !!errors.password_confirm}
                helperText={touched.password_confirm && errors.password_confirm}
                sx={{ gridColumn: "span 2" }}
              />
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
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required"),
  address: yup.string().required("required"),
  pincode: yup.string().required("required"),
  gst: yup.string().required("required"),
  password: yup.string().required("required"),
  password_confirm: yup.string().required("required"),
});
const initialValues = {
  name: "",
  email: "",
  contact: "",
  address: "",
  pincode: "",
  gst: "",
};

export default Form;
