"use client"
import Link from "next/link";
import React, { useState } from "react";
import { text } from "stream/consumers";

const Navbar = () => {
    const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      link: "/",
    },
    {
      id: 2,
      link: "playground",
    },
    {
      id: 3,
      link: "/practice",
    },
    {
      id: 4,
      link: "contest",
    },
  ];
  
  const myArray = ['Home', 'Playground', 'Practice','Contest'];

  return (
    <div className="flex justify-between items-center w-full h-10 px-4 text-gray-500 bg-black fixed nav">
      <div>
        {/* <h1 className="text-2xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
        <h1 className="text-2xl font-signature ml-2">
          <a
            className="link-underline link-underline-black"
            href=""
            target="_blank"
            rel="noreferrer"
          >
            <h3>KERNAL CRAFTERS</h3>
          </a>
        </h1>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link }) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
          >
            <Link href={link}>{myArray[id-1]}</Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {/* {nav ? <FaTimes size={30} /> : <FaBars size={30} />} */}
      </div>

      {nav && (
        <ul className="flex flex-col justify-start items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;