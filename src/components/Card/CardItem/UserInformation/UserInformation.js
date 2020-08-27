import React from "react";
import "./UserInformation.css";

const UserInFormation = ({ label, information }) => {
  return (
    <div className="user-information">
      <p className="user-information--label">{label}</p>
      <p className="user-information--information">{information}</p>
    </div>
  );
};

export default UserInFormation;
