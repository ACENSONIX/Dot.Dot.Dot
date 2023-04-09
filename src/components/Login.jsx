import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../actions/owner/owner";
import ReactCaptcha from "modern-react-captcha";
import { useState } from "react";
import CaptchaTest from "./Captcha";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [isDisabled, setIsDisabled] = useState(true);

  const handleSuccess = () => {
    setIsDisabled(false);
  };
  const handleFailure = () => {
    setIsDisabled(true);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    console.log(values);
    try {
      const data = {
        email: values.email,
        password: values.password,
      };
      dispatch(login(data, navigate));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <Box display="grid" sx={{ placeItems: "center", height: "100%" }}>
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
            <Header title="LOGIN" subtitle="Login into your profile" />
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                minWidth: "40vw",
              }}
            >
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
                sx={{ gridColumn: "span 4" }}
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
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', mt:3}}>
              {/* <ReactCaptcha
                charset="uln"
                color="random"
                bgColor="yellow"
                reload
                handleSuccess={handleSuccess}
                handleFailure={handleFailure}
              /> */}
              <CaptchaTest handleDisabled={handleDisabled} />
            </Box>
            <Box display="grid" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                // disabled={isDisabled}
              >
                Login
              </Button>
            </Box>
      <Link to="/signup" style={{textDecoration:'none', marginTop:"20px"}}>
        <Typography variant="h7" color="white">
        Don't have an account? Sign up
        </Typography>
        </Link>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
const initialValues = {
  email: "",
  password: "",
};

export default Form;
