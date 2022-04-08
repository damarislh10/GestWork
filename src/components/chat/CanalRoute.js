import React, { useState } from "react";
import ChatScreen from "./ChatScreen";
import Sliderbar from "./Sliderbar";

const CanalRoute = () => {
  const [canalActivo, setCanalActivo] = useState(null);

  return (
    <div className="app">
      <Sliderbar setCanalActivo={setCanalActivo} />
      <ChatScreen canalActivo={canalActivo} />
    </div>
  );
};

export default CanalRoute;
