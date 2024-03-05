/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import Header from "./Header";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [Query, setQuery] = useState("Hi");
  const [message, setMessage] = useState(null);
  const [text, setText] = useState("");
  const [Chats, setChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState([]);
  const [service, setService] = useState("Mistral");
  const { speak } = useSpeechSynthesis();
  const [Image, setImage] = useState("");
  const [Loading, setLoading] = useState(false);
  const [ImageQuery, setImageQuery] = useState("");
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
      if (service === "DALL-E" || service === "stable-diffusion") {
        try {
          setLoading(true);
          const response = await fetch(
            "http://localhost:8000/completions",
            options
          );

          const data = await response.json();
          setLoading(false);
          setImage(data.data[0].url);

          console.log(data);

          console.log(message);
        } catch (err) {
          console.error(err);
        }
      } else {
        setLoading(true);
        try {
          const response = await fetch(
            "http://localhost:8000/completions",
            options
          );
          const data = await response.json();
          setLoading(false);
          setMessage(data.choices[0].message);

          console.log(data);

          console.log(message);
        } catch (err) {
          console.error(err);
        }
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
    if (service === "DALL-E" || service === "stable-diffusion") {
      setImageQuery(text);
    }
    setText("");
  };
  console.log(Loading);

  return (
    <div className="flex flex-col mr-10 ">
      <Header service={service} setService={setService} />

      <ScrollArea className="w-[450px]  bg-card h-[485px] ">
        {Loading ? (
          <div className="flex items-center space-x-4 mt-5 ml-6">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <ul>
            {Chats?.map((item, index) => {
              return item.role === "user" ? (
                <li
                  className="flex flex-row gap-4 px-4 mt-2 items-center bg-primary mx-2 rounded-xl mb-4  ml-[102px] min-h-12 mr-2"
                  key={index}
                >
                  <p className="font-ABeeZee text-base font-semibold text-primary-foreground ">
                    {item.content}
                  </p>
                </li>
              ) : (
                <li
                  className="flex flex-row gap-2 px-4 mt-2 items-start   rounded-xl mb-4 mr-16"
                  key={index}
                >
                  <img
                    src={Image1}
                    alt=""
                    className="w-12 h-12 object-contain "
                  />
                  <p className="font-sans text-base text-secondary-foreground rounded-xl p-2 font-semibold bg-secondary">
                    {item.content}
                  </p>
                </li>
              );
            })}
          </ul>
        )}

        {service === "DALL-E" && ImageQuery && Image && !Loading ? (
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-4 px-4 mt-2 items-center bg-primary mx-2 rounded-xl mb-4  ml-16 min-h-12">
              <p className="font-sans text-base text-primary-foreground font-semibold ">
                {ImageQuery}
              </p>
            </div>
            <div className="flex flex-row gap-4 px-4 mt-2  mx-2 rounded-xl mb-4 mr-12 bg-secondary">
              <img
                src={Image1}
                alt=""
                className="w-12 h-12 object-contain mt-1"
              />

              <img src={Image} className="rounded-lg m-2 w-[300px]" />
            </div>
          </div>
        ) : (
          ""
        )}

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
      <div className="w-[450px]  bg-card p-1  flex items-end  ">
        <div className="mb-2">
          <form onSubmit={HandleSubmit} className="flex flex-row gap-1 ">
            <div className="bg-card flex gap-1 rounded-xl ml-1">
              <Input
                type="text"
                placeholder="Enter your Text Here"
                className="rounded-2xl border-2 bg-card text-card-foreground w-[350px] font-Hanken "
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <Button
                size="icon"
                variant="secondary"
                className="w-10 h-10 rounded-full border-primary bg-card hover:border-2"
                // onClick={toggleListening}
              >
                <FaMicrophone className="text-card-foreground" />
              </Button>
            </div>

            <Button
              size="icon"
              variant="secondary"
              className="w-10 h-10 rounded-full border-primary bg-card hover:border-2 "
              onClick={HandleClick}
            >
              <IoIosSend className="text-card-foreground" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Extension;
