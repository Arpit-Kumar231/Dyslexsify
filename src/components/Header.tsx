import { useEffect, useRef } from "react";
import Image from "../assests/dyslexi.png";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = ({ service, setService, type, setType, speak, voices }) => {
  const firstUpdate = useRef(true);
  const selectedVoice = voices[type];
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      speak({ text: service, voice: selectedVoice });
    }
  }, [service]);

  return (
    <div className="flex justify-between w-[450px]   bg-card p-1  items-center ">
      <div className="flex flex-row items-center gap-2">
        <img src={Image} alt="" className="w-12 h-12 object-contain ml-2" />
        <h1 className="font-Kelly font-medium text-white text-[24px]">
          Dyslexify Ai
        </h1>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="bg-card text-Hanken text-secondary-foreground font-ABeeZee rounded-xl font-semibold w-[70px]"
        >
          <option value="ChatGPT">ChatGPT</option>
          <option value="Mistral">Mistral</option>
          <option value="Gemma">Gemma</option>
          <option value="openhermes-2-5-m7b-4k">openhermes-2-5-m7b-4k</option>
          <option value="Code-Llama">Code-Llama</option>
          <option value="DALL-E">DALL-E</option>
          <option value="stable-diffusion">Stable-diffusion</option>
          <option value="DreamShaper">DreamShaper</option>
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-card text-Hanken text-secondary-foreground font-ABeeZee rounded-xl font-semibold w-[70px]"
        >
          <option value={0}>Arnold</option>
          <option value={1}>Sam</option>
          <option value={2}>Samantha</option>
          <option value={3}>Reisha</option>
          <option value={4}>Natalia</option>
          <option value={5}>Voila</option>
          <option value={6}>Samaritan</option>
        </select>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Header;
