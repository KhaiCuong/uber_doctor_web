// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// format gio
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
//checkbox
import { FormControlLabel, FormGroup, Icon, CheckboxGroup } from "@mui/material";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

// Data
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetBookingDetail, PutBooking, DeleteBookingByID } from "service/ApiService";
import Swal from "sweetalert2";
import "mystyle.css";
import { useMaterialUIController } from "context";
import ProtectRouter from "service/ProtectRouter";

function BookingEdit() {
  const [controller, dispatch] = useMaterialUIController();
  const { sidenavColor } = controller;
  const { id } = useParams();
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

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

  const handleBack = () => {
    navigate("/tables/bookings");
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
            const response = await PutBooking(id, data);
            if (response.status === 200) {
              Swal.fire("Updated!", "Your Information has been updated.", "success");
              navigate("/tables/bookings");
            }
          } catch (error) {
            console.log("err", error);
          }
        }
      });
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
          const response = await DeleteBookingByID(id);
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
  const validateForm = (data) => {
    let errors = {};
    if (!data.price) {
      errors.price = "price is required";
    } else if (data.price < 50000) {
      errors.address = "address must greater than 50.000 ";
    }
    return errors;
  };
  useEffect(() => {
    const GetBookingById = async () => {
      try {
        const response = await GetBookingDetail(id);
        if (response.status === 200) {
          // Chuyển định dạng ngày tháng từ ISO string sang định dạng mới
          const formattedBookingDate = format(
            parseISO(response.data.bookingDate),
            " HH:mm:ss yyyy-MM-dd",
            { locale: vi }
          );

          setData({
            ...response.data,
            bookingDate: formattedBookingDate,
          });

          console.log("Data:", response.data.patients.fullName);
          console.log("Data:", response.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    GetBookingById();
  }, [id]);
  // kiểm tra xem medicalRecord có null không?
  // const medicalRecord = data.patients ? data.patients.medicalRecord : null;

  // // Kiểm tra xem "medicalRecord" có tồn tại không
  // if (medicalRecord !== null && medicalRecord !== undefined) {
  //   // Bây giờ bạn có thể sử dụng medicalRecord mà không gặp lỗi
  //   console.log(medicalRecord);
  // } else {
  //   console.error("medicalRecord is null or undefined");
  // }
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
                    <Link to="/tables/bookings" className="text-light">
                      <Icon>arrow_back_ios_new</Icon>
                    </Link>
                    EDIT BOOKING
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
                      {/* Patient Name */}
                      <MDBox mb={2}>
                        <MDInput
                          name="fullname"
                          type="text"
                          label="Patient Name"
                          fullWidth
                          disabled
                          value={
                            data.patients && data.patients.fullName ? data.patients.fullName : ""
                          }
                        />
                        <span style={{ fontSize: "12px" }} className="text-danger">
                          {errors.fullname}
                        </span>
                      </MDBox>

                      {/* Patient Phone */}
                      <MDBox mb={2}>
                        <MDInput
                          name="phone"
                          type="text"
                          label="Patient Phone"
                          fullWidth
                          disabled
                          value={
                            data.patients && data.patients.phoneNumber
                              ? data.patients.phoneNumber
                              : ""
                          }
                        />
                        <span style={{ fontSize: "12px" }} className="text-danger">
                          {errors.phone}
                        </span>
                      </MDBox>
                      {/* Booking Date */}
                      <MDBox mb={2}>
                        <MDInput
                          name="bookingDate"
                          type="text"
                          label="Booking Date"
                          fullWidth
                          disabled
                          value={data.bookingDate ? data.bookingDate : ""}
                        />
                        <span style={{ fontSize: "12px" }} className="text-danger">
                          {errors.bookingDate}
                        </span>
                      </MDBox>
                      {/* Appointment Date */}
                      <MDBox mb={2}>
                        <MDInput
                          name="appointmentDate"
                          type="text"
                          label="Appointment Date"
                          fullWidth
                          value={data.appointmentDate ? data.appointmentDate : ""}
                          onChange={handleChangeInput}
                        />
                        <span style={{ fontSize: "12px" }} className="text-danger">
                          {errors.appointmentDate}
                        </span>
                      </MDBox>

                      {/* Appointment Time */}
                      <MDBox mb={2}>
                        <MDInput
                          name="appointmentTime"
                          type="text"
                          label="Appointment Time"
                          fullWidth
                          value={data.appointmentTime ? data.appointmentTime : ""}
                          onChange={handleChangeInput}
                        />
                        <span style={{ fontSize: "12px" }} className="text-danger">
                          {errors.appointmentTime}
                        </span>
                      </MDBox>

                      {/* Symptoms */}
                      <MDBox mb={2}>
                        <MDInput
                          name="symptoms"
                          type="text"
                          label="Symptoms"
                          fullWidth
                          value={data.symptoms ? data.symptoms : ""}
                          onChange={handleChangeInput}
                        />
                        <span style={{ fontSize: "12px" }} className="text-danger">
                          {errors.symptoms}
                        </span>
                      </MDBox>

                      {/* Notes */}
                      <MDBox mb={2}>
                        <MDInput
                          name="notes"
                          type="text"
                          label="Notes"
                          fullWidth
                          value={data.notes ? data.notes : ""}
                          onChange={handleChangeInput}
                        />
                        <span style={{ fontSize: "12px" }} className="text-danger">
                          {errors.notes}
                        </span>
                      </MDBox>

                      {/* Price */}
                      <MDBox mb={2}>
                        <MDInput
                          name="price"
                          type="text"
                          label="Price"
                          fullWidth
                          value={data.price ? data.price : ""}
                          onChange={handleChangeInput}
                        />
                        <span style={{ fontSize: "12px" }} className="text-danger">
                          {errors.price}
                        </span>
                      </MDBox>
                      {/* Status */}
                      <MDBox mb={2}>
                        <MDInput
                          name="statusBooking"
                          type="text"
                          label="Status: Pending/Scheduled/Canceled/Completed"
                          fullWidth
                          value={data.statusBooking ? data.statusBooking : ""}
                          onChange={handleChangeInput}
                        />
                        <span style={{ fontSize: "12px" }} className="text-danger">
                          {errors.statusBooking}
                        </span>
                      </MDBox>

                      <div className="d-flex justify-content-between align-items-center">
                        {/* ... (Toggle switch for Status) */}
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
                            &ensp;
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
        <Footer />;
      </DashboardLayout>
    </ProtectRouter>
  );
}
export default BookingEdit;
