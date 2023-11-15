import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

// eslint-disable-line
function ProtectRouter({ children }) {
  const token = localStorage.getItem("token");
  if (token) {
    // eslint-disable-line
    return children;
  } else {
    return <Navigate to="/authentication/sign-in" />;
  }
}

ProtectRouter.propTypes = {
  children: PropTypes.node,
};

export default ProtectRouter;
