import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { motion } from 'framer-motion';
import { api } from "../utils/api";

import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
          <>
      <Head>
        <title>Le fishe</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <motion.header className="bg-[#FAF9F6] z-20 flex h-[100px]"
                      initial={{
                        y: -150,
                        opacity: 0,
                        scale: 0.5
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        scale: 1
                    }}
                    transition={{
                        duration: 1,
                    }}
      > */}
        {/* <Image alt="logo" className="fixed ml-auto mr-auto left-0 right-0 z-20" src="/fishlogo.png" width={100} height={100}></Image> */}
      {/* </motion.header> */}
      <main className="flex w-[100vw] h-fit bg-[#FAF9F6]">
            <Navbar/>
            <Component {...pageProps}/>
      </main>
    </>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
