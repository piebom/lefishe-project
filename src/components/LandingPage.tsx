import React from "react";
import Image from "next/image";

function LandingPage() {
  return (
    <section
      id="main"
      className="relative flex h-screen w-screen snap-center items-center justify-center gap-x-10"
    >
      <div className="flex items-center justify-center">
        <div className="max-w-[400px]">
          <h1 className="text-6xl font-bold">Le Fishe</h1>
          <h1 className="pb-7 text-5xl">Fishing blog</h1>
          <p className="pb-7 text-xl text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
          </p>
          <button className=" mt-5 w-[50%] rounded-lg bg-[#6A8E7F] p-3 font-bold text-white">
            View Gallery
          </button>
        </div>
        <Image
          alt="logo"
          className="z-20"
          src="/bg.jpg"
          width={750}
          height={750}
        ></Image>
      </div>
    </section>
  );
}

export default LandingPage;
