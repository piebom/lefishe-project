import React from "react";
import LandingPage from "../components/LandingPage";
import { motion } from "framer-motion";
import Image from "next/image";
import WiePage from "../components/WiePage";
import LocationPage from "../components/LocationPage";
type Props = {};

function index({}: Props) {
  return (
    <div className="snap-mandatory scroll-smooth">
      <header className="max-w-screen fixed z-20 h-[100px] pt-5">
        <div className="flex w-screen flex-row justify-between pl-10 pr-10">
          <div className="flex items-center">
            <a href="#main">
              <Image
                alt="logo"
                className="z-20"
                src="/icon.png"
                width={100}
                height={100}
              ></Image>
            </a>
            {/* <h1 className='font-bold text-3xl'>Lefishe</h1> */}
          </div>
          <nav className="flex items-center">
            <ul className="flex gap-x-10">
              <li>
                <a href="#Wie" className="text-xl font-bold">
                  Wie
                </a>
              </li>
              <li>
                <a href="#Locatie" className="text-xl font-bold">
                  Locatie&apos;s
                </a>
              </li>
              <li>
                <a className="text-xl font-bold">Aas</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <LandingPage />

      <WiePage />

      <LocationPage />
    </div>
  );
}

export default index;
