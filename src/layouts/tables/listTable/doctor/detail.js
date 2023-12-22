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
import patientsTableData from "layouts/tables/data/patientsTableData";

import Swal from "sweetalert2";

// Css
import "mystyle.css";
import { useMaterialUIController } from "context";
import ProtectRouter from "service/ProtectRouter";
import DataTable from "examples/Tables/DataTable";
import bookingTableDoctorData from "layouts/tables/data/bookingTableDoctorData";
import paymentTableData from "layouts/tables/data/paymentsTableData";

function DoctorDetail() {
  const [controller, dispatch] = useMaterialUIController();
  const { sidenavColor } = controller;
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [img, setImg] = useState("https://mdbootstrap.com/img/Photos/Others/placeholder.jpg");
  const navigate = useNavigate();
  // const handleBack = () => {
  //   navigate("/tables/doctors");
  // };

  const { columns, rows } = bookingTableDoctorData();

  const handleBack = () => {
    this.props.history.goBack();
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
    GetDoctorById();
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
                    DOCTOR DETAIL
                    <Icon>list</Icon>
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
                          style={{ height: "400px" }}
                        />
                      </div>
                    </div>

                    <div className="col-sm-6 col-md-8">
                      <MDBox mb={2}>
                        <MDInput
                          name="fullName"
                          type="text"
                          label="Fullname"
                          disabled
                          fullWidth
                          value={data.fullName ? data.fullName : ""}
                        />
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          name="phoneNumber"
                          type="number"
                          label="Phone number"
                          disabled
                          fullWidth
                          value={data.phoneNumber ? data.phoneNumber : ""}
                        />
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          name="email"
                          type="email"
                          label="Email"
                          disabled
                          fullWidth
                          value={data.email ? data.email : ""}
                        />
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          name="exp"
                          type="text"
                          label="Years of Experience"
                          disabled
                          fullWidth
                          value={data.exp ? data.exp : ""}
                        />
                      </MDBox>

                      <MDBox mb={2}>
                        <MDInput
                          name="price"
                          type="number"
                          min="0"
                          max="9999999"
                          label="Consultation fee per hour"
                          disabled
                          fullWidth
                          value={data.price ? data.price : ""}
                        />
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          name="rate"
                          type="number"
                          label="Rate"
                          min="0"
                          max="5"
                          value={data.rate ? data.rate : ""}
                          disabled
                          fullWidth
                        />
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          name="spectiality"
                          type="text"
                          label="Spectiality"
                          disabled
                          fullWidth
                          value={data.spectiality ? data.spectiality : ""}
                        />
                      </MDBox>
                      <div className="d-flex justify-content-between align-items-center">
                        <MDBox mb={2}>
                          <MDTypography variant="button" fontWeight="regular" color="text">
                            Accept :&ensp;&ensp;
                          </MDTypography>
                          <label className="switch ml-4">
                            <input
                              type="checkbox"
                              name="accepted"
                              checked={data.accepted}
                              disabled
                            />
                            <span className="slider round "></span>
                          </label>
                        </MDBox>
                        <div className="mt-4 mb-4 d-flex justify-content-between align-items-center w-30"></div>
                      </div>
                    </div>
                  </div>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <h3>BOOKING LIST</h3>
        <MDBox pt={0}>
          <DataTable
            table={{ columns, rows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={true}
            noEndBorder
          />
        </MDBox>
        <h3 className="mt-4">FEEDBACK LIST</h3>
        <MDBox pt={0}>
          <DataTable
            table={paymentTableData()}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={true}
            noEndBorder
          />
        </MDBox>
        <Footer />
      </DashboardLayout>
    </ProtectRouter>
  );
}

export default DoctorDetail;
