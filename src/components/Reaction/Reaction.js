import React from "react";
import { IoIosHeart, IoIosClose } from "react-icons/io";
import "./Reaction.css";

const Reaction = ({ reaction }) => {
  return (
    <div className="reaction">
      {reaction === "left" ? (
        <IoIosClose className="reaction--icon ignore" />
      ) : (
        <IoIosHeart className="reaction--icon favorite" />
      )}
    </div>
  );
};

export default Reaction;
