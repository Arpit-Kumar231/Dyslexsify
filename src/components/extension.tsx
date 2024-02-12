import React from "react";
import Header from "./Header";
import Textarea from "./Textarea";
import Image from "../assests/dyslexify.png";

const Extension = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="w-[450px] ml-4 bg-black p-1 h-[750px] flex items-end ">
        <Textarea />
      </div>
    </div>
  );
};

export default Extension;
