// import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
// import Calendar from "./scenes/calendar/calendar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Layout from "./components/Layout";
import Employee from "./scenes/employee/employee";
import Applicant from "./scenes/applicant/applicant";
import ViewEmployee from "./scenes/employee/viewEmployee";
import NewApplicant from "./scenes/applicant/newApplicant";
import ViewApplicant from "./scenes/applicant/viewApplicant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getApplicants } from "./actions/applicants/applicants";

function App() {
  const [theme, colorMode] = useMode();

  const dispatch = useDispatch();

  useEffect(() => {
    const getReduxData = async () => {
      dispatch(getApplicants());
    };
    getReduxData();
  }, [dispatch]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* <Route path='/' element={<Dashboard />} /> */}

          <Route path='/dashboard' element={<Layout />}>
            <Route path='/dashboard/app' element={<Dashboard />} />
            <Route path='/dashboard/team' element={<Team />} />
            <Route path='/dashboard/employee' element={<Employee />} />
            <Route path='/dashboard/applicant' element={<Applicant />} />
            <Route path='/dashboard/add-applicant' element={<NewApplicant />} />
            <Route path='/dashboard/view-applicant/:id' element={<ViewApplicant />} />
            <Route path='/dashboard/view-employee/:id' element={<ViewEmployee />} />
          </Route>

          {/* 
              <Route path='/contacts' element={<Contacts />} />
              <Route path='/invoices' element={<Invoices />} />
              <Route path='/form' element={<Form />} />
              <Route path='/bar' element={<Bar />} />
              <Route path='/pie' element={<Pie />} />
              <Route path='/line' element={<Line />} />
              <Route path='/faq' element={<FAQ />} />
              <Route path='/calendar' element={<Calendar />} />
              <Route path='/geography' element={<Geography />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
