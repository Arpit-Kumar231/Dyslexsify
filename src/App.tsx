import React from "react";
import Navbar from "./components/NavBar";
import Extension from "./components/extension";

const App = () => {
  return (
    <div className="rounded-xl">
      <Navbar />
      <div className="h-[900px] bg-indigo-600 flex justify-end">
        <Extension />
      </div>
    </div>
  );
};

export default App;
