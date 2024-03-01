/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import Header from "./Header";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image1 from "../assests/dyslexi.png";
import { useSpeechSynthesis } from "react-speech-kit";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

const Extension = () => {
  const [Query, setQuery] = useState("Hello Dyslexify");
  const [message, setMessage] = useState(null);
  const [text, setText] = useState("");
  const [Chats, setChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState([]);
  const [service, setService] = useState("ChatGPT");
  const { speak } = useSpeechSynthesis();
  useEffect(() => {
    setChats([]);
  }, []);

  // const {
  //   transcript,
  //   listening,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition,
  // } = useSpeechRecognition();
  // useEffect(() => {
  //   setText(transcript);
  // }, [transcript]);
  console.log(service);
  useEffect(() => {
    const getMessages = async () => {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: Query,
          service: service, // You need to define Query before using it here
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
        console.log(message);
      } catch (err) {
        console.error(err);
      }
    };

    getMessages();
  }, [Query]);
  useEffect(() => {
    if (message != null) {
      setChats([
        ...Chats,
        { role: "user", content: Query },
        { role: message.role, content: message.content },
      ]);
    }
  }, [message]);
  useEffect(() => {
    if (message != null) speak({ text: message.content });
  }, [message]);

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }

  // const toggleListening = () => {
  //   if (listening) {
  //     SpeechRecognition.stopListening();
  //     resetTranscript(); // Optional: You can choose to reset the transcript or not after stopping.
  //   } else {
  //     SpeechRecognition.startListening({ continuous: true });
  //   }
  // };

  const HandleSubmit = (e) => {
    e.preventDefault();
  };
  const HandleClick = () => {
    setQuery(text);
    setText("");
  };

  return (
    <div className="flex flex-col mr-10 ">
      <Header service={service} setService={setService} />
      <ScrollArea className="w-[450px]  bg-black h-[485px]">
        <ul>
          {Chats?.map((item, index) => {
            return item.role === "user" ? (
              <li
                className="flex flex-row gap-4 px-4 mt-2 items-center bg-black mx-2 rounded-xl mb-4 "
                key={index}
              >
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="font-ABeeZee text-base font-semibold text-white ml-2">
                  {item.content}
                </p>
              </li>
            ) : (
              <li
                className="flex flex-row gap-4 px-4 mt-2 items-center bg-slate-700 mx-2 rounded-xl mb-4"
                key={index}
              >
                <img src={Image1} alt="" className="w-12 h-12 object-contain" />
                <p className="font-sans text-base text-white font-semibold">
                  {item.content}
                </p>
              </li>
            );
          })}
        </ul>

        {/* {Query && (
          <div className="flex flex-row gap-4 px-4 mt-2 items-center bg-green-600 mx-2 rounded-xl mb-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-Hanken text-white ml-2">{Query}</p>
          </div>
        )}
        {message && (
          <div className="flex flex-row gap-4 px-4 mt-2 items-center bg-red-600 mx-2 rounded-xl">
            <img src={Image1} alt="" className="w-12 h-12 object-contain" />
            <p className="font-Kelly text-white">{message.content}</p>
          </div>
        )} */}
      </ScrollArea>
      <div className="w-[450px]  bg-black p-1  flex items-end  ">
        <div className="mb-2">
          <form onSubmit={HandleSubmit} className="flex flex-row gap-1 ">
            <div className="bg-white flex gap-1 rounded-xl ml-1">
              <Input
                type="text"
                placeholder="Enter your Text Here"
                className="rounded-2xl border-0 bg-white w-[350px] font-Hanken "
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <Button
                size="icon"
                variant="secondary"
                className="w-10 h-10 rounded-full bg-white"
                // onClick={toggleListening}
              >
                <FaMicrophone />
              </Button>
            </div>

            <Button
              size="icon"
              variant="secondary"
              className="w-10 h-10 rounded-full bg-[white] hover:bg-slate-100"
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
