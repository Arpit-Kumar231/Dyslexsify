import Header from "./Header";
import Textarea from "./Textarea";
import Image from "../assests/dyslexify.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image1 from "../assests/dyslexify.png";
import { useSpeechSynthesis } from "react-speech-kit";

const Extension = () => {
  const [Query, setQuery] = useState(null);
  const [message, setMessage] = useState(null);
  const [text, setText] = useState(null);
  const [previousChats, setPreviousChats] = useState();
  const [currentTitle, setCurrentTitle] = useState([]);
  const { speak } = useSpeechSynthesis();
  const HandleSubmit = (e) => {
    e.preventDefault();
    setText("");
  };
  const HandleClick = () => {
    setQuery(text);
  };
  useEffect(() => {
    const getMessages = async () => {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: Query, // You need to define Query before using it here
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await fetch(
          "http://localhost:8000/completions",
          options
        );
        const data = await response.json();
        setMessage(data.choices[0].message);
      } catch (err) {
        console.error(err);
      }
    };

    getMessages();
  }, [Query]);
  useEffect(() => {
    if (message != null) speak({ text: message.content });
  }, [message]);

  useEffect(() => {
    console.log(currentTitle, Query, message);
    if (!currentTitle && Query && message) {
      setCurrentTitle(Query);
    }
    if (!currentTitle && Query && message) {
      setPreviousChats((prevChats) => {
        [
          ...prevChats,
          {
            title: currentTitle,
            role: "user",
            content: Query,
          },
          {
            title: currentTitle,
            role: message.role,
            content: message.content,
          },
        ];
      });
    }
  }, [message, currentTitle]);
  console.log(previousChats);

  return (
    <div className="flex flex-col">
      <Header />
      <ScrollArea className="w-[450px] ml-4 bg-black h-[700px]">
        {Query && (
          <div className="flex flex-row gap-4 px-4 mt-2 items-center bg-green-600 mx-2 rounded-xl mb-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-Hanken text-white">{Query}</p>
          </div>
        )}
        {message && (
          <div className="flex flex-row gap-4 px-4 mt-2 items-center bg-red-600 mx-2 rounded-xl">
            <img src={Image1} alt="" className="w-12 h-12 object-contain" />
            <p className="font-Kelly text-white">{message.content}</p>
          </div>
        )}
      </ScrollArea>
      <div className="w-[450px] ml-4 bg-black p-1  flex items-end ">
        <div className="mb-2">
          <form onSubmit={HandleSubmit} className="flex flex-row gap-1 ">
            <div className="bg-white flex gap-1 rounded-xl">
              <Input
                type="text"
                placeholder="Enter your Text Here"
                className="rounded-2xl border-0 bg-white w-[350px] font-Hanken "
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <Button size="icon" className="w-10 h-10 rounded-full bg-white">
                <FaMicrophone />
              </Button>
            </div>

            <Button
              size="icon"
              className="w-10 h-10 rounded-full bg-white"
              onClick={HandleClick}
            >
              <IoIosSend />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Extension;
