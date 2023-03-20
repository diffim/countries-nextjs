import React from "react";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";

function Filter() {
  const [showDropdown, setShowDropdown] = useState(false);

  function DropDownItem(props: { name: string }) {
    return <button className=" p-1">{props.name}</button>;
  }

  return (
    <div className=" flex  w-full flex-col items-center justify-between sm:flex-row 2xl:px-28">
      <div className="dark:dark-element light-element flex w-full items-center rounded-sm p-3 shadow-md shadow-gray-200 dark:shadow-gray-700 sm:w-2/5 ">
        <BiSearch />
        <input
          type="text"
          placeholder="Search country"
          className=" ml-2  w-full bg-transparent outline-none "
        />
      </div>

      <div className="relative min-w-fit sm:mt-0 sm:w-[12%]">
        <button
          onClick={() => setShowDropdown((prevDropdown) => !prevDropdown)}
          className="dark:dark-element light-element mt-5 w-full  rounded-sm p-3 px-5 shadow-md shadow-gray-200 dark:shadow-gray-700 "
        >
          Select by region:
        </button>

        {showDropdown ? (
          <div
            className="dark:dark-element light-element absolute  z-10 mt-5 flex w-full flex-col items-start
            rounded-sm p-3 px-5 shadow-md  shadow-gray-200  dark:shadow-gray-700  "
          >
            <DropDownItem name="Africa" />
            <DropDownItem name="America" />
            <DropDownItem name="Asia" />
            <DropDownItem name="Europe" />
            <DropDownItem name="Oceania" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Filter;
