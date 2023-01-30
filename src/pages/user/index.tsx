import React, { useEffect, useState } from 'react'
import { useSession, signIn, getCsrfToken  } from "next-auth/react"
import Loginform from '../../components/Loginform'
import { useRouter } from 'next/router'
import { signOut } from "next-auth/react";
import {motion,useIsPresent} from "framer-motion"
type Props = {}

function index({}: Props) {
  const { data: session } = useSession()
  const router = useRouter();
  const isPresent = useIsPresent();
  if (session) {
    return(
      <div className='w-full min-h-screen flex justify-center items-center'>
              <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 1, ease: "anticipate" } }}
        exit={{ scaleX: 0, transition: { duration: 1, ease: "backIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
        <div className='shadow-2xl bg-white w-[400px] h-fit rounded-[15px] p-10 flex flex-col'>
          <h1 className='text-2xl mb-5'>Welcome {session.user?.name}</h1>
          <button className='bg-red-500 p-2 text-white font-bold rounded-md' onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    )
  }
  else{
    if (typeof window !== "undefined") {
      router.push("/user/login")
    }
  }
}

export default index