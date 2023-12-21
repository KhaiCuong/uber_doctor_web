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
import { PutDoctor, DeleteDoctorByID, GetDoctorDetail } from "service/ApiService";
import Swal from "sweetalert2";

// Css
import "mystyle.css";
import { useMaterialUIController } from "context";
import ProtectRouter from "service/ProtectRouter";
import { GetDepartmentList } from "service/ApiService";

function DoctorEdit() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const [img, setImg] = useState("https://mdbootstrap.com/img/Photos/Others/placeholder.jpg");

  const formData = new FormData();

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const validateForm = (data) => {
    let errors = {};
    if (!data.email) {
      errors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email format";
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
    if (data.department_id) {
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
    navigate("/tables/doctors");
  };

  const handelCombobox = (e) => {
    var selectElement = document.getElementById("department_id");
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    var departmentID = selectElement.value;
    var departmentName = selectedOption.text;

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
    console.log("event.target.files[0]", event.target.files[0]);

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

  const handleEdit = (e) => {
    e.preventDefault();
    console.log("update1");

    const newErrors = validateForm(data);
    if (Object.keys(newErrors).length > 0) {
      console.log("update2");

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
      formData.append("accepted", data.accepted);
      if (data.department_id != null && data.department_id != undefined) {
        formData.append("department_id", data.department_id);
      }
      if (data.image != null && data.image != undefined) {
        formData.append("image", data.image);
      }

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
            const response = await PutDoctor(id, formData);
            if (response.status === 200) {
              Swal.fire("Updated!", "Your Information has been updated.", "success");
              navigate("/tables/doctors");
            }
          } catch (error) {
            console.log("err", error);
            console.log("errr");
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
          const response = await DeleteDoctorByID(id);
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
    const GetDoctorById = async () => {
      try {
        const response = await GetDoctorDetail(id);
        console.log("response.status", response);
        if (response.status === 200) {
          setData(response.data);
          console.log("response.data.imagePath", response.data.imagePath);

          if (response.data.imagePath != null && response.data.imagePath != "") {
            console.log("img", `http://localhost:8080/${response.data.imagePath}`);
            setImg(`http://localhost:8080/${response.data.imagePath}`);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const GetSpecilityList = async () => {
      try {
        const response = await GetDepartmentList();
        // console.log("response.status", response);
        if (response.status === 200) {
          setList(response.data);
          // console.log("response.data.imagePath", response.data.imagePath);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    GetDoctorById();
    GetSpecilityList();

    console.log("list", list);
    // list.map((item) => {
    //  if(data.spectiality === item.departmentName) {
    //   setData({
    //     ...data,
    //     department_id: item.id,
    //   });
    //  }
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
                    EDIT DOCTOR
                    <Icon>edit</Icon>
                  </MDTypography>
                </MDBox>

                <MDBox pt={4} pb={3} px={3}>
                  <div className="row">
                    <div className="col-sm-6 col-md-4">
                      <div className="mb-4 d-flex justify-content-center">
                        <img
                          id="selectedImage"
                          src={img}
                          alt="example placeholder"
                          className="w-100"
                          style={{ height: "300px" }}
                        />
                      </div>
                      <div className="mt-3">
                        <label>New image:</label>
                        <input
                          name="imagePath"
                          type="file"
                          // value={data.phoneNumber ? data.phoneNumber : ""}
                          onChange={(event) => handleFileChange(event, "selectedImage")}
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
                        {/* <MDInput
                          name="exp"
                          type="text"
                          label="Years of Experience"
                          fullWidth
                          value={data.exp ? data.exp : ""}
                          onChange={handleChangeInput}
                        /> */}
                        <label
                          htmlFor="department_id"
                          className="w-100 font-size-small text-secondary font-size-small"
                        >
                          Choose a Spectiality:
                        </label>
                        <select
                          name="department_id"
                          id="department_id"
                          className="w-100 border my-selection-box"
                          onChange={handelCombobox}
                        >
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
                        <div className="mt-4 mb-4 d-flex justify-content-between align-items-center w-30">
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

export default DoctorEdit;
