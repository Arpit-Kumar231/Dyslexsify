import { GiAcid } from "react-icons/gi";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";

const Navbar = () => {
  return (
    <div className="flex bg-black text-slate-50 justify-end">
      <div className="flex justify-end w-2/4">
        <ul className="flex flex-row justify-around w-[700px] mt-5">
          <li className="mb-3">
            <span className="mr-3  text-xs bg-indigo-700 px-3 rounded-full font-Hanken">
              NEW!
            </span>
            <span className="border-b-2 border-indigo-600 mb-2 pb-1">
              <span className="mr-2 text-indigo-400 font-Hanken">
                Dyslexify Ai
              </span>
              <span className="font-Hanken">extension</span>
            </span>
          </li>
          <li className="mb-3 font-Hanken">Images</li>
          <li className="mb-3">
            <GiAcid size={28} />
          </li>
          <li>
            <TfiLayoutGrid3Alt size={22} />
          </li>
          <li className="mb-3 ">
            <div className="flex h-9 w-9 rounded-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBXNuO6PezhC18aYH_2cYtS0I7KbxoKYdwA&usqp=CAU"
                }
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
