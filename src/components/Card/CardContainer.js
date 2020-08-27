import React, { useContext } from "react";
import { animated, interpolate } from "react-spring";
import get from "lodash/get";
import "./CardContainer.css";
import { AppContext } from "../../AppContext";

import CardItem from "./CardItem/CardItem";

const CardContainer = ({ i, x, y, bind }) => {
  const { data } = useContext(AppContext);
  const people = get(data, "0");
  const seed = get(people, "seed");

  return (
    <animated.div
      key={i}
      className="card-container"
      style={{
        transform: interpolate(
          [x, y],
          (x, y) => `translate3d(${x}px,${y}px,0)`
        ),
      }}
    >
      <animated.div {...bind(i, seed)}>
        <CardItem people={people} />
      </animated.div>
    </animated.div>
  );
};

export default CardContainer;
