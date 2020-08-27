import React, { useState, useContext } from "react";
import { useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

import { AppContext } from "../../AppContext";
import Card from "../Card/CardContainer";
import Reaction from "../Reaction/Reaction";
import Error from "../Error/Error";

import "./Deck.css";
const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -200 });

const Deck = () => {
  const {
    data,
    onLeftSwipe,
    onRightSwipe,
    isLeft,
    isRight,
    isFetchDataError,
  } = useContext(AppContext);
  const [gone] = useState(() => new Set());
  const [props, set] = useSprings(data.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useDrag(
    ({
      args: [index, seed],
      down,
      movement: [mx],
      distance,
      direction: [xDir],
      velocity,
    }) => {
      const trigger = velocity > 0.1;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) gone.add(seed);
      set((i) => {
        if (index !== i) return;
        const isGone = gone.has(seed);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;

        console.log(isGone, xDir);
        if (xDir < 0 && isGone) {
          onLeftSwipe();
        }

        if (xDir > 0 && isGone) {
          onRightSwipe(get(data, "0"));
        }

        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
    }
  );

  if (isFetchDataError) return <Error />;

  if (isLeft && isEmpty(data)) return <Reaction reaction="left" />;

  if (isRight && isEmpty(data)) return <Reaction reaction="right" />;

  return props.map(({ x, y, rot, scale }, i) => {
    return <Card i={i} key={i} x={x} y={y} bind={bind} />;
  });
};

export default Deck;
