import React, { useState } from "react";
import Deck from "./components/Deck/Deck";
import Mode from "./components/Mode/Mode";
import Favorite from "./components/Favorite/Favorite";

import { AppProvider } from "./AppContext";

const App = () => {
  const [mode, setMode] = useState("find-someone");

  const onChangeMode = () => {
    if (mode === "find-someone") {
      setMode("favorite");
      return;
    }
    setMode("find-someone");
  };
  return (
    <AppProvider>
      <Mode mode={mode} onChangeMode={onChangeMode} />
      {mode === "find-someone" ? <Deck /> : <Favorite />}
    </AppProvider>
  );
};

export default App;
