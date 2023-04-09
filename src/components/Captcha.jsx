import React, { Component } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { Box, Typography, Button, TextField } from "@mui/material";

class CaptchaTest extends Component {
  componentDidMount() {
    loadCaptchaEnginge(6);
  }

  doSubmit = () => {
    let user_captcha = document.getElementById("user_captcha_input").value;
    if (validateCaptcha(user_captcha) === true) {
    //   alert("Captcha Matched");
    //use handleDisabled here
    } else {
      alert("Captcha Does Not Match");
    }
  };

  render() {
    return (
      <>
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%'}}>
            <Box sx={{mt:2, mb:2}}>
          <LoadCanvasTemplate />
            </Box>
            <Box sx={{width:'100%'}}>
                <TextField
                    variant="filled"
                    placeholder="Enter Captcha Value"
                    id="user_captcha_input"
                    name="user_captcha_input"
                    type="text"
                    required
                    fullWidth
                />
            </Box>
            <Box sx={{mt:2}}>
                <Button variant="contained" color="secondary" onClick={() => this.doSubmit()} >
                    <Typography variant="h7" color="white">
                        Submit
                    </Typography>
                </Button>
            </Box>
        </Box>
      </>
    );
  }
}

export default CaptchaTest;
