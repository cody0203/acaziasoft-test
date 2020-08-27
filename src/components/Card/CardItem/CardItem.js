import React, { useState, useEffect } from "react";
import get from "lodash/get";
import {
  IoIosMap,
  IoIosCall,
  IoIosLock,
  IoMdCalendar,
  IoIosPerson,
} from "react-icons/io";
import "./CardItem.css";

import UserInFormation from "./UserInformation/UserInformation";
import SectionButton from "./SectionButton/SectionButton";

const icons = [
  {
    iconComponent: <IoIosPerson />,
    label: "person",
  },
  {
    iconComponent: <IoMdCalendar />,
    label: "dob",
  },
  {
    iconComponent: <IoIosMap />,
    label: "address",
  },
  {
    iconComponent: <IoIosCall />,
    label: "phone",
  },
  {
    iconComponent: <IoIosLock />,
    label: "password",
  },
];

const CardItem = ({ people }) => {
  const [information, setInformation] = useState("");
  const [activeButton, setActiveButton] = useState("address");
  const [label, setLabel] = useState("");

  const { picture, location, name, dob, phone, password } = get(people, "user");

  const { state, city, zip } = location;
  const { first, last } = name;

  const userInformation = {
    person: {
      label: "My name is",
      value: `${first} ${last}`,
    },
    dob: {
      label: "My birthday is",
      value: `${new Date(dob * 1000).toLocaleDateString("en-US")}`,
    },
    address: {
      label: "My address is",
      value: `${zip} ${city} ${state}`,
    },
    phone: {
      label: "My phone number is",
      value: phone,
    },
    password: {
      label: "My password is (shhh, please don't tell anyone)",
      value: password,
    },
  };

  useEffect(() => {
    const getLabel = get(userInformation, `${activeButton}.label`);
    const getInformation = get(userInformation, `${activeButton}.value`);
    setLabel(getLabel);
    setInformation(getInformation);
  }, [activeButton, userInformation]);

  const onSelectButton = (label) => {
    setActiveButton(label);
  };
  return (
    <div className="card">
      <div className="card--top">
        <img src={picture} className="card--top__avatar" alt="avatar" />
      </div>
      <div className="card--bottom">
        <div className="card--bottom__content">
          <UserInFormation label={label} information={information} />
          {/* <p className="label">My address is</p>
    <p className="value">
      
    </p> */}
          <div className="card--bottom__button-container">
            {icons.map((icon, index) => (
              <SectionButton
                icon={icon}
                isActive={get(icon, "label") === activeButton}
                key={index}
                onSelectButton={onSelectButton}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
