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
import bookingsTableData from "layouts/tables/data/bookingsTableData";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import { Icon } from "@mui/material";
import { useMaterialUIController } from "context";
import ProtectRouter from "service/ProtectRouter";

function Bookings() {
  const { columns, rows } = bookingsTableData();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
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
                    <Link to="/tables" className="text-light">
                      <Icon>arrow_back_ios_new</Icon>
                    </Link>
                    BOOKINGS TABLE
                    <Link to="create" className="text-light  d-flex align-items-center">
                      {/* <MDButton variant="outlined" color="light" size="small">
                        <Icon>add</Icon> Create new
                      </MDButton> */}
                    </Link>
                  </MDTypography>
                </MDBox>
                <MDBox pt={3} height="90vh">
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={true}
                    showTotalEntries={true}
                    noEndBorder
                  />
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

export default Bookings;
