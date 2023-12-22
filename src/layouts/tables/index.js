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
import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";
import { Link } from "react-router-dom";
import { useMaterialUIController } from "context";
import ProtectRouter from "service/ProtectRouter";

function Tables() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;

  return (
    <ProtectRouter>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3} height="90vh">
          <Grid container spacing={6}>
            {/* <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Authors Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}
            <Grid item xs={12}>
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
                  <div className="d-flex justify-content-between align-items-center">
                    Patients Table&ensp;<Icon fontSize="small">accessible</Icon>
                  </div>

                  <Link to="patients" className="text-light">
                    <MDButton variant="outlined" color="light" size="small">
                      view all
                    </MDButton>
                  </Link>
                </MDTypography>
              </MDBox>
            </Grid>

            <Grid item xs={12}>
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
                  <div className="d-flex justify-content-between align-items-center">
                    Doctor Table&ensp;<Icon fontSize="small">medication_liquid</Icon>
                  </div>

                  <Link to="doctors" className="text-light">
                    <MDButton variant="outlined" color="light" size="small">
                      view all
                    </MDButton>
                  </Link>
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12}>
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
                  <div className="d-flex justify-content-between align-items-center">
                    Booking Table&ensp;<Icon fontSize="small"></Icon>
                  </div>

                  <Link to="bookings" className="text-light">
                    <MDButton variant="outlined" color="light" size="small">
                      view all
                    </MDButton>
                  </Link>
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12}>
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
                  <div className="d-flex justify-content-between align-items-center">
                    Payment Table&ensp;<Icon fontSize="small"></Icon>
                  </div>

                  <Link to="payments" className="text-light">
                    <MDButton variant="outlined" color="light" size="small">
                      view all
                    </MDButton>
                  </Link>
                </MDTypography>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    </ProtectRouter>
  );
}

export default Tables;
