import React, { useContext } from "react";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import "./Favorite.css";
import { AppContext } from "../../AppContext";
import CardItem from "../Card/CardItem/CardItem";

const Favorite = () => {
  const { favoritePeople } = useContext(AppContext);

  if (isEmpty(favoritePeople)) return <div></div>;
  return (
    <div className="favorite">
      {favoritePeople.map((people) => {
        const seed = get(people, "seed");
        return <CardItem key={seed} people={people} />;
      })}
    </div>
  );
};

export default Favorite;
