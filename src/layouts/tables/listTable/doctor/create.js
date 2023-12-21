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
import Swal from "sweetalert2";

// Css
import "mystyle.css";
import { useMaterialUIController } from "context";
import ProtectRouter from "service/ProtectRouter";
import { PostDoctor, GetDepartmentList } from "service/ApiService";
import { GetDoctorList } from "service/ApiService";

function DoctorCreate() {
  const [controller, dispatch] = useMaterialUIController();
  const { sidenavColor } = controller;
  const formData = new FormData();

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [stt, setStt] = useState(true);
  const navigate = useNavigate();
  const [phoneList, setPhoneList] = useState([]);
  const [mailList, setMailList] = useState([]);
  const [list, setList] = useState([]);

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
    if (!data.fullName) {
      errors.fullName = "Fullname is required";
    } else if (data.fullName.length < 6 || data.fullName.length > 20) {
      errors.fullName = "Fullname must be between 6 - 20 characters";
    }
    if (!data.phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    } else if (data.phoneNumber.length < 9) {
      errors.phoneNumber = "Phone Number in viet nam must be have 9 or 10 number";
    } else if (phoneList.includes(data.phoneNumber)) {
      errors.phoneNumber = "Phone number is already in use";
    }
    if (!data.exp) {
      errors.exp = "Years of Experience is required";
    } else if (data.exp.length < 0 || data.exp.length > 100) {
      errors.exp = "Years of Experience must be between 0 - 100";
    }
    if (!data.price) {
      errors.price = "Consultation fee per hour is required";
    } else if (data.price.length < 0 || data.price.length > 10000000) {
      errors.price = "Consultation fee per hour must be between 0 - 10000000";
    }
    if (data.rate < 0 || data.rate > 5) {
      errors.rate = "rate must be between 0 - 5";
    }
    if (typeof data.department_id === "undefined") {
      errors.department_id = "Please choose Spectiality";
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
      setData({ ...data, accepted: true });
    } else {
      setData({ ...data, accepted: false });
    }
  };

  const handleBack = () => {
    this.props.history.goBack();
  };

  const handelCombobox = (e) => {
    var selectElement = document.getElementById("department_id");
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    var departmentID = selectElement.value;
    var departmentName = selectedOption.text;

    setErrors({
      ...errors,
      department_id: "",
    });

    setData({
      ...data,
      spectiality: departmentName,
      department_id: departmentID,
    });
  };

  //upload Image
  const handleFileChange = (event, elementId) => {
    // const files = event.target.files;
    formData.append("image", event.target.files[0]);

    setData({
      ...data,
      image: event.target.files[0],
    });

    const selectedImage = document.getElementById(elementId);
    const fileInput = event.target;
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
      console.log("err", errors.department_id);
      setErrors(newErrors);
      return;
    } else {
      formData.append("fullName", data.fullName);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("email", data.email);
      formData.append("spectiality", data.spectiality);
      formData.append("price", data.price);
      formData.append("exp", data.exp);
      formData.append("rate", data.rate);
      if (typeof data.accepted === "undefined" || data.accepted == null) {
        formData.append("accepted", false);
      } else {
        formData.append("accepted", data.accepted);
      }

      if (data.department_id != null && typeof data.department_id != "undefined") {
        formData.append("department_id", data.department_id);
      }
      if (data.image != null && typeof data.image != "undefined") {
        formData.append("image", data.image);
      }
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
            const response = await PostDoctor(formData);

            console.log("response.status", response.status);

            if (response.status === 200) {
              Swal.fire("Created!", "Your Information has been Created.", "success");
              navigate("/tables/doctors");
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
    const GetSpecilityList = async () => {
      try {
        const response = await GetDepartmentList();
        if (response.status === 200) {
          setList(response.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    const fetchDataDoctor = async () => {
      try {
        const response = await GetDoctorList();
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
    fetchDataDoctor();
    GetSpecilityList();
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
                    <Link to="/tables/doctors" className="text-light">
                      <Icon>arrow_back_ios_new</Icon>
                    </Link>
                    <MDTypography variant="h6" color="white">
                      CREATE NEW DOTOR
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
                              onChange={(event) => handleFileChange(event, "selectedImage")}
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
                          name="exp"
                          type="text"
                          label="Years of Experience"
                          fullWidth
                          value={data.exp ? data.exp : ""}
                          onChange={handleChangeInput}
                        />
                        <span style={{ fontSize: "12px" }} className="text-danger">
                          {errors.exp}
                        </span>
                      </MDBox>

                      <MDBox mb={2}>
                        <MDInput
                          name="price"
                          type="number"
                          min="0"
                          max="9999999"
                          label="Consultation fee per hour"
                          fullWidth
                          value={data.price ? data.price : ""}
                          onChange={handleChangeInput}
                        />
                        <span style={{ fontSize: "12px" }} className="text-danger">
                          {errors.price}
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
                      <MDBox mb={2}>
                        <label
                          htmlFor="department_id"
                          className="w-100 font-size-small text-secondary"
                        >
                          Choose a Spectiality:
                        </label>
                        <select
                          name="department_id"
                          id="department_id"
                          className="w-100 border my-selection-box font-size-small"
                          onChange={handelCombobox}
                        >
                          <option value="">Choose your Spectiality</option>
                          {list.length > 0 ? (
                            list.map((item, index) => {
                              return (
                                <option
                                  key={index}
                                  value={item.id}
                                  selected={data.spectiality === item.departmentName}
                                >
                                  {item.departmentName}
                                </option>
                              );
                            })
                          ) : (
                            <div>No Spectiality to show</div>
                          )}
                        </select>
                        <span style={{ fontSize: "12px" }} className="text-danger">
                          {errors.department_id}
                        </span>
                      </MDBox>
                      <div className="d-flex justify-content-between align-items-center">
                        <MDBox mb={2}>
                          <MDTypography variant="button" fontWeight="regular" color="text">
                            Accept :&ensp;&ensp;
                          </MDTypography>
                          <label className="switch ml-4">
                            <input
                              type="checkbox"
                              onChange={handleChangeStatus}
                              name="accepted"
                              checked={data.accepted}
                            />
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

export default DoctorCreate;
