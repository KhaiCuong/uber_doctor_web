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
import "mystyle.css";

import { GetDoctorList, PutAccept } from "../../../service/ApiService";

// Images
import team2 from "assets/images/team-2.jpg";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilterContext } from "context/FilterContext";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

export default function data() {
  const { fKey } = useContext(FilterContext); // get information from context

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
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

  const [data, setData] = useState([]);
  const [render, setRender] = useState(true);

  useEffect(() => {
    const fetchDataPatient = async () => {
      try {
        const response = await GetDoctorList();
        let newresponse = response.data.filter((col) => col.phoneNumber.includes(fKey));

        if (response.status === 200) {
          setData(newresponse);
        }
        console.log("response", response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDataPatient();
  }, [fKey, render]);

  function handelAccept(id) {
    Swal.fire({
      title: "Do you want to Accept?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await PutAccept(id);
        if (response.status === 200) {
          setRender(!render);
        }
      }
    });
  }

  return {
    columns: [
      { Header: "Fullname", accessor: "fullname", width: "30%", align: "left" },
      { Header: "Phone", accessor: "phone", align: "right" },
      { Header: "Email", accessor: "email", align: "left" },
      { Header: "Specialty", accessor: "specialty", align: "center" },
      // { Header: "Experience ", accessor: "experience", align: "center" },
      // { Header: "Hourly rate ", accessor: "price", align: "center" },
      { Header: "Rate", accessor: "rate", align: "center" },
      { Header: "Accepted", accessor: "accepted", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: data.map((item, index) => ({
      fullname: <Author image={team2} name={item.fullName} email={item.id} />,
      phone: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.phoneNumber}
        </MDTypography>
      ),
      email: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.email}
        </MDTypography>
      ),
      specialty: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.spectiality}
        </MDTypography>
      ),
      specialty: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.spectiality}
        </MDTypography>
      ),
      // experience: (
      //   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //     {item.exp}
      //   </MDTypography>
      // ),
      // price: (
      //   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //     {item.price}
      //   </MDTypography>
      // ),
      rate: <Job title={item.rate} name={item.rate} description="Star" />,
      accepted: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={item.accepted === true ? "True" : "False"}
            color={item.accepted === true ? "success" : "secondary"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" fontWeight="medium">
          <button
            className="text-success text-button"
            hidden={item.accepted}
            onClick={() => handelAccept(item.id)}
          >
            ACCEPT
          </button>
          <div> </div>
          <Link to={"edit/" + item.id} className="text-Primary">
            EDIT
          </Link>
          <div> </div>
          <Link to={"detail/" + item.id} className="text-secondary">
            DETAIL
          </Link>
        </MDTypography>
      ),
    })),
  };
}
