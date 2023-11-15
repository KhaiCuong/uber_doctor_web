// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetPatientDetail } from "service/ApiService";
import { PutPatient } from "service/ApiService";
import Swal from "sweetalert2";

// Css
import "mystyle.css";
import { useMaterialUIController } from "context";
import ProtectRouter from "service/ProtectRouter";
import { DeletePatientByID } from "service/ApiService";

function PatientEdit() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const { id } = useParams();
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const validateForm = (data) => {
    let errors = {};
    if (!data.email) {
      errors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email format";
    }
    if (!data.password) {
      errors.password = "password is required";
    } else if (data.password.length < 6 || data.password.length > 20) {
      errors.password = "Password must be between 6 - 20 characters";
    }
    if (!data.fullName) {
      errors.fullName = "Fullname is required";
    } else if (data.fullName.length < 6 || data.fullName.length > 20) {
      errors.fullName = "Fullname must be between 6 - 20 characters";
    }
    if (!data.phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    } else if (data.phoneNumber.length != 10) {
      errors.phoneNumber = "Phone Number in viet nam must be have 10 number";
    } else if (data.phoneNumber[0] != 0) {
      errors.phoneNumber = "Phone Number must be start with number 0";
    }
    if (!data.address) {
      errors.address = "address is required";
    } else if (data.address.length < 5 || data.address.length > 50) {
      errors.address = "address must be between 5 - 50 characters";
    }
    if (data.rate < 0 || data.rate > 5) {
      errors.rate = "rate must be between 0 - 5";
    }
    return errors;
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setData({
      ...data,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleChangeStatus = (e) => {
    let isCheked = e.target.checked;
    console.log("isCheked", isCheked);
    if (isCheked) {
      setData({ ...data, status: true });
    } else {
      setData({ ...data, status: false });
    }
  };

  const handleBack = () => {
    navigate("/tables/patients");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(data);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await PutPatient(id, data);
            if (response.status === 200) {
              Swal.fire("Updated!", "Your Information has been updated.", "success");
              navigate("/tables/patients");
            }
          } catch (error) {
            console.log("err", error);
          }
        }
      });
      console.log("update");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await DeletePatientByID(id);
          if (response.status === 200) {
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
            handleBack();
          }
        } catch (error) {
          console.log("err", error);
        }
      }
    });
  };

  useEffect(() => {
    const GetPatientById = async () => {
      try {
        const response = await GetPatientDetail(id);
        console.log("response.status", response);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    GetPatientById();
  }, []);

  return (
    <ProtectRouter>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor={sidenavColor}
                  borderRadius="lg"
                  coloredShadow="secondary"
                >
                  <MDTypography
                    variant="h6"
                    color="white"
                    className="d-flex justify-content-between align-items-center"
                  >
                    <Link to="/tables/patients" className="text-light">
                      <Icon>arrow_back_ios_new</Icon>
                    </Link>
                    EDIT PATIENT
                    <Icon>edit</Icon>
                  </MDTypography>
                </MDBox>

                <MDBox pt={4} pb={3} px={3}>
                  <div className="row">
                    <div className="col-sm-6 col-md-4">
                      <img
                        className="w-100 rounded"
                        height="300px"
                        src="https://ttol.vietnamnetjsc.vn/images/2018/05/25/13/40/net-cuoi-be-gai-7-15270534400351230956726.jpg"
                      ></img>
                      <div className="mt-3">
                        <label>New image:</label>
                        <input
                          name="image"
                          type="file"
                          // value={data.phoneNumber ? data.phoneNumber : ""}
                          // onChange={handleChangeInput}
                        />
                      </div>
                    </div>

                    <div className="col-sm-6 col-md-8">
                      <MDBox mb={2}>
                        <MDInput
                          name="fullName"
                          type="text"
                          label="Fullname"
                          fullWidth
                          value={data.fullName ? data.fullName : ""}
                          onChange={handleChangeInput}
                        />
                        <span style={{ fontSize: "12px" }} className="text-danger">
                          {errors.fullName}
                        </span>
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          name="phoneNumber"
                          type="number"
                          label="Phone number"
                          disabled
                          fullWidth
                          value={data.phoneNumber ? data.phoneNumber : ""}
                          onChange={handleChangeInput}
                        />
                        <span style={{ fontSize: "12px" }} className="text-danger">
                          {errors.phoneNumber}
                        </span>
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          name="email"
                          type="email"
                          label="Email"
                          disabled
                          fullWidth
                          value={data.email ? data.email : ""}
                          onChange={handleChangeInput}
                        />
                        <span style={{ fontSize: "12px" }} className="text-danger">
                          {errors.email}
                        </span>
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          name="password"
                          type="password"
                          label="Password"
                          fullWidth
                          value={data.password ? data.password : ""}
                          onChange={handleChangeInput}
                        />
                        <span style={{ fontSize: "12px" }} className="text-danger">
                          {errors.password}
                        </span>
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          name="address"
                          type="text"
                          label="Address"
                          fullWidth
                          value={data.address ? data.address : ""}
                          onChange={handleChangeInput}
                        />
                        <span style={{ fontSize: "12px" }} className="text-danger">
                          {errors.address}
                        </span>
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          name="rate"
                          type="number"
                          label="Rate"
                          min="0"
                          max="5"
                          value={data.rate ? data.rate : ""}
                          onChange={handleChangeInput}
                          fullWidth
                        />
                        <span style={{ fontSize: "12px" }} className="text-danger">
                          {errors.rate}
                        </span>
                      </MDBox>
                      <div className="d-flex justify-content-between align-items-center">
                        <MDBox mb={2}>
                          <MDTypography variant="button" fontWeight="regular" color="text">
                            Status :&ensp;&ensp;
                          </MDTypography>
                          <label className="switch ml-4">
                            <input
                              type="checkbox"
                              onChange={handleChangeStatus}
                              checked={data.status}
                            />
                            <span className="slider round "></span>
                          </label>
                        </MDBox>
                        <div className="mt-4 mb-4 d-flex justify-content-between align-items-center w-25">
                          <MDButton variant="gradient" color="info" onClick={handleEdit}>
                            <Icon>edit</Icon> Edit
                          </MDButton>
                          <MDButton
                            variant="gradient"
                            color="error"
                            onClick={() => {
                              handleDelete(data.id);
                            }}
                          >
                            <Icon>delete</Icon> Delete
                          </MDButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    </ProtectRouter>
  );
}

export default PatientEdit;
