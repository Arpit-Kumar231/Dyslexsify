/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import Header from "./Header";
import { Skeleton } from "@/components/ui/skeleton";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image1 from "../assests/dyslexi.png";
import { useSpeechSynthesis, useSpeechRecognition } from "react-speech-kit";

// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

const Extension = () => {
  const [Query, setQuery] = useState("Hi");
  const [message, setMessage] = useState(null);
  const [text, setText] = useState("");
  const [Chats, setChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState([]);
  const [service, setService] = useState("ChatGPT");
  const { speak, cancel, voices } = useSpeechSynthesis();
  const [Image, setImage] = useState("");
  const [Loading, setLoading] = useState(false);
  const [ImageQuery, setImageQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [sound, setSound] = useState(false);
  const [baseUrl, setbaseUrl] = useState("");
  const [ImageChats, setImageChats] = useState([]);
  const [type, setType] = useState(2);
  const [fallBack, setFallBack] = useState("");
  const [language, setlanguage] = useState("English");
  // const renderStop = useRef(true);
  // const [page, setpage] = useState(false);

  const { listen, listening, stop, onResult } = useSpeechRecognition({
    onResult: (result) => {
      setText(result);
      console.log(result);
    },
  });

  useEffect(() => {
    setChats([]);
  }, []);

  useEffect(() => {
    listen();
    return stop;
  }, [listen, stop]);

  // const {
  //   transcript,
  //   listening,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition,
  // } = useSpeechRecognition();
  // useEffect(() => {
  //   setText(transcript);
  // }, [transcript]);
  // useEffect(() => {
  //   // if (renderStop.current) {
  //   //   renderStop.current = false;
  //   // } else {
  //   console.log("hello");
  //   fetch("http://localhost:8000/") // Adjust this URL to your API endpoint
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setFallBack(data.text);
  //     });
  //   // }
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/");
        const newData = await response.json();
        setFallBack(newData.text);
        console.log(newData.text);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData() immediately to load data initially
    fetchData();

    // Set up a timer to call fetchData() every 5 seconds
    const intervalId = setInterval(fetchData, 1000);

    // Clear the interval on cleanup to avoid memory leaks and multiple timers
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: Query,
          service: service,
          language: language, // You need to define Query before using it here
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (service === "DALL-E") {
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
      }
      if (service === "stable-diffusion" || service === "DreamShaper") {
        try {
          setLoading(true);
          const response = await fetch(
            "http://localhost:8000/completions",
            options
          );

          const data = await response.json();
          setLoading(false);
          setbaseUrl(data[0]);

          console.log(data[0]);

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
        { type: "chat", role: "user", content: Query },
        { type: "chat", role: message.role, content: message.content },
      ]);
    }
  }, [message]);
  useEffect(() => {
    if (
      service === "DALL-E" ||
      service === "stable-diffusion" ||
      (service === "DreamShaper" && (Image != null || baseUrl != null))
    ) {
      setChats([
        ...Chats,
        { type: "image", role: "user", content: ImageQuery },
        {
          type: "image",
          role: "answer",
          content: service === "DALL-E" ? Image : baseUrl,
        },
      ]);
    }
  }, [Image, baseUrl]);
  useEffect(() => {
    const selectedVoice = voices[type];
    if (message != null) speak({ text: message.content, voice: selectedVoice });
  }, [message]);

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }

  const toggleListening = () => {
    if (listening) {
      stop();
    } else {
      listen();
    }
  };
  // const toggleListening = () => {
  //   setIsListening((prevState) => !prevState);
  // };

  const HandleSubmit = (e) => {
    e.preventDefault();
  };
  const HandleClick = () => {
    setQuery(text);
    if (
      service === "DALL-E" ||
      service === "stable-diffusion" ||
      service === "DreamShaper"
    ) {
      setImageQuery(text);
    }
    setText("");
  };
  // console.log(page);

  return (
    <div className="flex flex-col mr-10 ">
      <Header
        service={service}
        setService={setService}
        type={type}
        setType={setType}
        speak={speak}
        voices={voices}
      />

      <ScrollArea className="w-[450px]  bg-card h-[485px] ">
        {/* {Loading ? (
          <div className="flex items-center space-x-4 mt-5 ml-6">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : ( */}
        <ul>
          {Chats?.map((item, index) => {
            return item.role === "user" ? (
              <li
                className="flex flex-row gap-4 px-4 mt-2 items-center bg-primary mx-2 rounded-xl mb-4  ml-[102px] min-h-12 mr-2"
                key={index}
              >
                <p className="font-ABeeZee text-base font-semibold text-primary-foreground max-w-[300px]">
                  {item.content}
                </p>
              </li>
            ) : (
              <li
                className="flex flex-row gap-2 px-[14px] mt-2 items-start   rounded-xl mb-4 mr-16"
                key={index}
              >
                <img
                  src={Image1}
                  alt=""
                  className="w-12 h-12 object-contain "
                />
                {item.type === "chat" ? (
                  <p className="font-sans text-base text-secondary-foreground rounded-xl p-2 font-semibold bg-background">
                    {item.content}
                  </p>
                ) : (
                  <img
                    src={item.content}
                    className="m-2 w-[300px] bg-secondary rounded-xl"
                  />
                )}
              </li>
            );
          })}
        </ul>
        {Loading ? (
          <div>
            <div className="space-y-2">
              <Skeleton className="h-8 w-[250px] ml-[190px] rounded-lg  " />
            </div>

            <div className="flex items-center space-x-4 mt-5 ml-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] rounded-lg" />
                <Skeleton className="h-4 w-[200px] rounded-lg" />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* )} */}
        {/* {Loading ? (
          <div className="flex items-center space-x-4 mt-5 ml-6">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <ul>
            {ImageChats?.map((item, index) => {
              return item.role === "user" ? (
                <li
                  className="flex flex-row gap-4 px-4 mt-2 items-center bg-primary mx-2 rounded-xl mb-4  ml-[102px] min-h-12 mr-2"
                  key={index}
                >
                  <p className="font-sans text-base text-primary-foreground font-semibold ">
                    {item.content}
                  </p>
                </li>
              ) : (
                <li key={index}>
                  <div className="flex flex-row gap-2 px-4 mt-2   rounded-xl mb-4 mr-12 ">
                    <img
                      src={Image1}
                      alt=""
                      className="w-12 h-12 object-contain mt-1"
                    />

                    <img
                      src={item.content}
                      className="m-2 w-[300px] bg-secondary rounded-xl"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )} */}

        {/* {service === "DALL-E" && ImageQuery && Image && !Loading ? (
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-4 px-4 mt-2 items-center bg-primary mx-2 rounded-xl mb-4  ml-[102px] mr-2 min-h-12">
              <p className="font-sans text-base text-primary-foreground font-semibold ">
                {ImageQuery}
              </p>
            </div>
            <div className="flex flex-row gap-2 px-4 mt-2   rounded-xl mb-4 mr-12 ">
              <img
                src={Image1}
                alt=""
                className="w-12 h-12 object-contain mt-1"
              />

              <img
                src={Image}
                className="m-2 w-[300px] bg-secondary rounded-xl"
              />
            </div>
          </div>
        ) : (
          ""
        )} */}
        {/* {service === "stable-diffusion" && ImageQuery && !Loading && baseUrl ? (
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-4 px-4 mt-2 items-center bg-primary mx-2 rounded-xl mb-4  ml-[102px] mr-2 min-h-12">
              <p className="font-sans text-base text-primary-foreground font-semibold ">
                {ImageQuery}
              </p>
            </div>
            <div className="flex flex-row gap-2 px-4 mt-2   rounded-xl mb-4 mr-12 ">
              <img
                src={Image1}
                alt=""
                className="w-12 h-12 object-contain mt-1"
              />

              <img
                src={baseUrl}
                className="m-2 w-[300px] bg-secondary rounded-xl"
              />
            </div>
          </div>
        ) : (
          ""
        )} */}
        {!Loading && (
          <Button
            onClick={cancel}
            className="rounded-xl ml-[175px] mt-4 bg-background text-foreground hover:border-2 sticky  "
          >
            Stop Voice⛔
          </Button>
        )}
        {!Loading && (
          <Button
            onClick={() => {
              setQuery(fallBack);
            }}
            className="rounded-xl ml-[140px] mt-4 bg-background text-foreground hover:border-2 hover:b sticky   mb-2"
          >
            Summarize Current Page
          </Button>
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
                onClick={toggleListening}
              >
                <FaMicrophone className="text-card-foreground" />
              </Button>
              {/* <select
                value={language}
                onChange={(e) => setlanguage(e.target.value)}
                className="bg-card text-Hanken text-secondary-foreground font-ABeeZee rounded-xl font-semibold w-[70px]"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="Japanese">Japanese</option>
                <option value="Dutch">Dutch</option>
                <option value="French">French</option>
                <option value="Arabic">Arabic</option>
                <option value="Chinese">Chinese</option>
                <option value="German">German</option>
              </select> */}
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
