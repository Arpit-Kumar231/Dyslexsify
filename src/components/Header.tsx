import React from "react";
import Image from "../assests/dyslexify.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  return (
    <div className="flex justify-between w-[450px] mt-4 ml-4 bg-black p-1 border-b items-center rounded-md">
      <div className="flex flex-row items-center gap-2">
        <img src={Image} alt="" className="w-12 h-12 object-contain" />
        <h1 className="font-Kelly font-medium text-white text-[24px]">
          Dyslexify Ai
        </h1>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Header;
