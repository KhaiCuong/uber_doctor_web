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
import { FilterContext } from "context/FilterContext";

import { GetPatientList } from "../../../service/ApiService";

// Images
import team2 from "assets/images/team-2.jpg";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  // Product
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataPatient = async () => {
      try {
        const response = await GetPatientList();
        let newresponse = response.data.filter((col) => col.phoneNumber.includes(fKey));

        if (response.status === 200) {
          setData(newresponse);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDataPatient();
  }, [fKey]);

  return {
    columns: [
      { Header: "FullName", accessor: "fullname", width: "30%", align: "left" },
      { Header: "Phone Number", accessor: "phoneNumber", align: "right" },
      { Header: "Email", accessor: "email", align: "left" },
      { Header: "Rate", accessor: "rate", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
      // { Header: "Address", accessor: "address", align: "center" },
    ],

    rows: data.map((item, index) => ({
      fullname: <Author image={team2} name={item.fullName} email={item.id} />,
      phoneNumber: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.phoneNumber}
        </MDTypography>
      ),
      email: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.email}
        </MDTypography>
      ),
      rate: <Job title={item.rate} name={item.rate} description="Star" />,
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={item.status === true ? "True" : "False"}
            color={item.status === true ? "success" : "secondary"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" fontWeight="medium">
          <Link to={"edit/" + item.id} className="text-secondary">
            Edit
          </Link>
        </MDTypography>
      ),
      // address: (
      //   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //     {item.address}
      //   </MDTypography>
      // ),
    })),
  };
}

// rows: [
//   {
//     fullname: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
//     rate: <Job title="Manager" description="Organization" />,
//     status: (
//       <MDBox ml={-1}>
//         <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
//       </MDBox>
//     ),
//
//     action: (
//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//         Edit
//       </MDTypography>
//     ),
//   },
// ],
