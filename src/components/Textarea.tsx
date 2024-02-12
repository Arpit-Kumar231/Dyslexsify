import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { useState } from "react";

const Textarea = () => {
  const [Query, setQuery] = useState("");
  const HandleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="mb-2">
      <form onSubmit={HandleSubmit} className="flex flex-row gap-1 ">
        <div className="bg-white flex gap-1 rounded-xl">
          <Input
            type="text"
            placeholder="Enter your Text Here"
            className="rounded-2xl border-0 bg-white w-[350px] font-Hanken "
            value={Query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <Button size="icon" className="w-10 h-10 rounded-full bg-white">
            <FaMicrophone />
          </Button>
        </div>

        <Button size="icon" className="w-10 h-10 rounded-full bg-white">
          <IoIosSend />
        </Button>
      </form>
    </div>
  );
};

export default Textarea;
