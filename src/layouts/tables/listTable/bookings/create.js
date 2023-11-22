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
import Switch from "@mui/material/Switch";
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
import { PostPatient } from "service/ApiService";
import ProtectRouter from "service/ProtectRouter";
import { GetPatientList } from "service/ApiService";

function PatientCreate() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [stt, setStt] = useState(true);
  const navigate = useNavigate();
  const [phoneList, setPhoneList] = useState([]);
  const [mailList, setMailList] = useState([]);

  const [errors, setErrors] = useState({});
  const validateForm = (data) => {
    let errors = {};
    if (!data.email) {
      errors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email format";
    } else if (mailList.includes(data.email)) {
      errors.email = "email is already in use";
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
    } else if (phoneList.includes(data.phoneNumber)) {
      errors.phoneNumber = "Phone number is already in use";
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
      setStt(true);
    } else {
      setData({ ...data, status: false });
      setStt(false);
    }
  };

  const handleBack = () => {
    navigate("/tables/patients");
  };

  const displaySelectedImage = (event, elementId) => {
    const selectedImage = document.getElementById(elementId);
    const fileInput = event.target;

    console.log("event", fileInput);

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        selectedImage.src = e.target.result;
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  };

  const handleCreate = (e) => {
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
        confirmButtonText: "Yes, create it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await PostPatient(data);
            if (response.status === 201) {
              Swal.fire("Created!", "Your Information has been Created.", "success");
              navigate("/tables/patients");
            }
          } catch (error) {
            console.log("err", error);
          }
        }
      });
      console.log("created");
    }
  };

  useEffect(() => {
    const fetchDataPatient = async () => {
      try {
        const response = await GetPatientList();
        if (response.status === 200) {
          const phoneNumArr = [];
          const emailArr = [];
          for (let i = 0; i < response.data.length; i++) {
            phoneNumArr[i] = response.data[i].phoneNumber;
            emailArr[i] = response.data[i].email;
          }
          setPhoneList(phoneNumArr);
          setMailList(emailArr);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDataPatient();
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
                    <MDTypography variant="h6" color="white">
                      CREATE NEW PATIENT
                    </MDTypography>
                    <Icon fontSize="2px">person_add</Icon>
                  </MDTypography>
                </MDBox>

                <MDBox pt={4} pb={3} px={3}>
                  <div className="row">
                    <div className="col-sm-6 col-md-4 ">
                      <div>
                        <div className="mb-4 d-flex justify-content-center">
                          <img
                            id="selectedImage"
                            src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                            alt="example placeholder"
                            className="w-100"
                            style={{ height: "300px" }}
                          />
                        </div>
                        <div className="d-flex justify-content-center">
                          <MDButton variant="gradient" color="info">
                            <label
                              className="form-label text-white m-1 d-flex justify-content-center"
                              htmlFor="customFile1"
                            >
                              <Icon>image</Icon>Choose file
                            </label>
                            <input
                              type="file"
                              className="form-control d-none"
                              id="customFile1"
                              onChange={(event) => displaySelectedImage(event, "selectedImage")}
                            />
                          </MDButton>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-8">
                      <MDBox mb={2}>
                        <MDInput
                          name="fullName"
                          type="text"
                          label="Fullname"
                          fullWidth
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
                          fullWidth
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
                          fullWidth
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
                            <input type="checkbox" onChange={handleChangeStatus} checked={stt} />
                            <span className="slider round "></span>
                          </label>
                        </MDBox>
                        <MDButton variant="gradient" color="info" onClick={handleCreate}>
                          <Icon>add</Icon> Create
                        </MDButton>
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

export default PatientCreate;
