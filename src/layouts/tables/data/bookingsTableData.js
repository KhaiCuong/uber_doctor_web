/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Patient Page: https://www.creative-tim.com/Patient/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import { GetBookingList, GetPatientList } from "../../../service/ApiService";

// Images
import team2 from "assets/images/team-2.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// format gio
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

const statusColors = {
  Pending: "warning",
  Scheduled: "info",
  Completed: "success",
  Canceled: "error",
};
export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">Booking Id: {email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  // Product
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataBooking = async () => {
      try {
        const response = await GetBookingList();
        console.log("response.status", response);
        if (response.status === 200) {
          console.log("response.data", response);
          setData(response.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDataBooking();
  }, []);

  return {
    columns: [
      { Header: "Paitient Name", accessor: "fullname", align: "left" },
      { Header: "Patient Phone", accessor: "phone", align: "left" },
      { Header: "Doctor Name", accessor: "doctorName", align: "left" },
      { Header: "Appointment Time", accessor: "appointmentTime", align: "center" },
      { Header: "Booking Date", accessor: "bookingDate", align: "center" },
      // { Header: "Symptoms", accessor: "symptoms", align: "left" },
      // { Header: "Notes", accessor: "notes", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: data.map((item, index) => ({
      fullname: (
        <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
          {`${item.id}.   ${item.patients.fullName}`}
        </MDTypography>
      ),
      phone: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.patients.phoneNumber}
        </MDTypography>
      ),
      doctorName: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.doctors.fullName}
        </MDTypography>
      ),
      appointmentTime: (
        <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
          {`${item.appointmentDate}
            ${item.appointmentTime}`}
        </MDTypography>
      ),
      bookingDate: (
        <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
          {item.bookingDate}
        </MDTypography>
      ),
      // symptoms: <MDTypography variant="caption">{item.symptoms}</MDTypography>,
      // notes: <MDTypography variant="caption">{item.notes}</MDTypography>,
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={item.statusBooking}
            color={statusColors[item.statusBooking]}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" fontWeight="medium">
          <Link to={"/tables/bookings/edit/" + item.id} className="text-secondary">
            Edit
          </Link>
        </MDTypography>
      ),
    })),
  };

  // return {
  //   columns: [
  //     { Header: "Paitient Name", accessor: "fullname", width: "30%", align: "left" },
  //     { Header: "Patient Phone", accessor: "phone", align: "left" },
  //     { Header: "Status", accessor: "status", align: "center" },
  //     { Header: "Doctor Name", accessor: "doctorName", align: "left" },
  //     { Header: "Patient Address", accessor: "address", align: "center" },
  //     { Header: "Action", accessor: "action", align: "center" },
  //     { Header: "Appointment Time", accessor: "appointmentTime", align: "center" },
  //     { Header: "Symptoms", accessor: "symptoms", align: "left" },
  //     { Header: "Notes", accessor: "notes", align: "left" },
  //     { Header: "Price", accessor: "price", align: "left" },
  //     { Header: "Booking Date", accessor: "bookingDate", align: "center" },
  //     { Header: "Availability", accessor: "isAvailable", align: "center" },
  //   ],

  //   rows: data.map((item, index) => ({
  //     fullname: <Author image={team2} name={item.patients.fullName} email={item.id} />,
  //     phone: (
  //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
  //         {item.patients.phoneNumber}
  //       </MDTypography>
  //     ),
  //     status: (
  //       <MDBox ml={-1}>
  //         <MDBadge
  //           badgeContent={item.statusBooking}
  //           color={statusColors[item.statusBooking]}
  //           variant="gradient"
  //           size="sm"
  //         />
  //       </MDBox>
  //     ),
  //     doctorName: (
  //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
  //         {item.doctors.fullName}
  //       </MDTypography>
  //     ),
  //     address: (
  //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
  //         {item.patients.address}
  //       </MDTypography>
  //     ),
  //     action: (
  //       <MDTypography component="a" href="#" variant="caption" fontWeight="medium">
  //         <Link to={"edit/" + item.id} className="text-secondary">
  //           Edit
  //         </Link>
  //       </MDTypography>
  //     ),
  //     appointmentTime: (
  //       <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
  //         {`${item.appointmentDate}   ${item.appointmentTime}`}
  //       </MDTypography>
  //     ),
  //     symptoms: item.symptoms,
  //     notes: item.notes,
  //     price: item.price,
  //     bookingDate: (
  //       <MDTypography variant="caption">
  //         {format(parseISO(item.bookingDate), "HH:mm:ss yyyy-MM-dd", { locale: vi })}
  //       </MDTypography>
  //     ),
  //     isAvailable: item.isAvailable,
  //   })),
  // };
}
