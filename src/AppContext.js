import React, { createContext, useEffect, useState } from "react";
import get from "lodash/get";
import { isEmpty } from "lodash";

export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLeft, setIsLeft] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [favoritePeople, setFavoritePeople] = useState([]);
  const [isFetchDataError, setIsFetchDataError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async (cb) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://randomuser.me/api/0.4/?randomapi`);
      const userJson = await response.json();
      const user = get(userJson, "results");
      setIsLoading(false);
      setIsFetchDataError(false);
      setData(user);
      if (cb) {
        cb();
      }
    } catch (err) {
      console.log(err);
      setIsFetchDataError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const localStorageFavoritePeople =
      JSON.parse(localStorage.getItem("favorite_people")) || [];
    setFavoritePeople(localStorageFavoritePeople);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorite_people", JSON.stringify(favoritePeople));
  }, [favoritePeople]);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const isSwipe = isLeft || isRight;
    if (isSwipe && isEmpty(data)) {
      const resetSwipe = () => {
        setIsLeft(false);
        setIsLeft(false);
      };

      fetchUser(resetSwipe);
    }
  }, [isLeft, isRight, data]);

  const onRightSwipe = (user) => {
    const favoritePeopleArr = [...favoritePeople];
    favoritePeopleArr.push(user);
    setFavoritePeople(favoritePeopleArr);

    setIsRight(true);
    setData([]);
  };

  const onLeftSwipe = () => {
    setIsLeft(true);
    setData([]);
  };

  const context = {
    data,
    isLeft,
    isRight,
    onRightSwipe,
    onLeftSwipe,
    favoritePeople,
    isFetchDataError,
    fetchUser,
    isLoading,
  };
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
