/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Icon } from "@mui/material";
import { PostLogin } from "service/ApiService";
import Swal from "sweetalert2";
import NavigateToDashboard from "service/NavigateToDashboard";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [errors, setErrors] = useState({});
  const initialState = {
    email: "",
    password: "",
  };
  const [dataLogin, setDataLogin] = useState(initialState);
  const navigate = useNavigate();

  // Call API
  const fetchLogin = async () => {
    try {
      const response = await PostLogin(dataLogin);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("userToken", JSON.stringify(response.data.data.userToken));

        console.log("response", response);
        // navigate
        navigate("/dashboard");

        // if (response.data.userToken.role === "Admin") {
        //   navigate("/admin");
        // }
      }
    } catch (error) {
      Swal.fire({
        title: "Login faild",
        text: "Please check your email and password.",
        icon: "error",
      });
    }
  };

  // handle login
  function handleLogin(e) {
    e.preventDefault();
    const newErrors = validateForm(dataLogin);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      fetchLogin();
    }
  }

  // handle when user type information
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Validate data login
  const validateForm = (dataLogin) => {
    let errors = {};

    if (!dataLogin.email) {
      errors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(dataLogin.email)) {
      errors.email = "Invalid email format";
    }
    if (!dataLogin.password) {
      errors.password = "password is required";
    } else if (dataLogin.password.length < 6 || dataLogin.password.length > 20) {
      errors.password = "Password must be between 6 - 20 characters";
    }

    return errors;
  };

  // hidden error when typing
  const handleInputFocus = (name) => {
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  return (
    <NavigateToDashboard>
      <BasicLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Sign in
            </MDTypography>
            <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
              <Grid item xs={2}>
                <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                  <Icon>vaccines</Icon>
                </MDTypography>
              </Grid>
              <Grid item xs={2}>
                <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                  <Icon>medication</Icon>
                </MDTypography>
              </Grid>
              <Grid item xs={2}>
                <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                  <Icon>monitor_heart</Icon>
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  label="Email"
                  name="email"
                  onChange={handleInputChange}
                  error={errors.email}
                  fullWidth
                  onFocus={() => handleInputFocus("email")}
                />
                <span style={{ fontSize: "12px" }} className="text-danger">
                  {errors.email}
                </span>
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Password"
                  name="password"
                  onChange={handleInputChange}
                  fullWidth
                  error={errors.password}
                  onFocus={() => handleInputFocus("password")}
                />
                <span style={{ fontSize: "12px" }} className="text-danger">
                  {errors.password}
                </span>
              </MDBox>
              <MDBox display="flex" alignItems="center" ml={-1}>
                <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  onClick={handleSetRememberMe}
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;Remember me
                </MDTypography>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth onClick={handleLogin}>
                  sign in
                </MDButton>
              </MDBox>
              {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
            </MDBox>
          </MDBox>
        </Card>
      </BasicLayout>
    </NavigateToDashboard>
  );
}

export default Basic;
