import React, { useContext } from "react";
import get from "lodash/get";
import { AppContext } from "../../AppContext";
import "./Mode.css";

const Mode = ({ mode, onChangeMode }) => {
  const { favoritePeople } = useContext(AppContext);

  return (
    <div className="mode" onClick={onChangeMode}>
      {mode === "find-someone" ? (
        <span>Favorite {get(favoritePeople, "length")}</span>
      ) : (
        <span>Find Someone</span>
      )}
    </div>
  );
};

export default Mode;
