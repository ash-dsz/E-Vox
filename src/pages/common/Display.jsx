import React from "react";

function Display() {
  return (
    <div className="app-container content-around  ">
      <form className="mx-8 my-12">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Election
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Samca</option>
          <option>CR 1</option>
          <option>CR 2</option>
          <option>CR 3</option>
        </select>
      </form>
    </div>
  );
}

export default Display;
