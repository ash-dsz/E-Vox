import React from "react";
import { useEffect, useState } from "react";

function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h1>hello world </h1>
      <button
        onClick={() => {
          alert("Congratulations!");
        }}
        className="bg-green-500 px-12 py-2 my-4 rounded-md"
      >
        no
      </button>
      <br />
      <button
        className="bg-red-500 px-12 py-2 rounded-md cursor-not-allowed"
        disabled
      >
        yes
      </button>
    </div>
  );
}

export default Home;
