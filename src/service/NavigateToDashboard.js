import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

// eslint-disable-line
function NavigateToDashboard({ children }) {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/dashboard" />;
  } else {
    return children;
  }
}

NavigateToDashboard.propTypes = {
  children: PropTypes.node,
};

export default NavigateToDashboard;
