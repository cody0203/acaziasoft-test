import React, { useContext } from "react";
import "./Error.css";
import { AppContext } from "../../AppContext";
const Error = () => {
  const { fetchUser, isLoading } = useContext(AppContext);
  return (
    <div className="error">
      <p>An error occurred</p>
      <div
        onClick={fetchUser.bind(this, null)}
        className={`error--try-again-button ${isLoading ? "disabled" : ""}`}
      >
        Try again
      </div>
    </div>
  );
};

export default Error;
