import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import Image from "next/image";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const session = useSession()
  console.log(session)
  return (
    <div className='w-full min-h-full flex justify-center items-center'>
      <h1 className="text-[50px] font-bold tracking-widest">COMING SOON...</h1>
    </div>
  );
};

export default Home;

