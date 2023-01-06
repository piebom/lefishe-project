import React, { useEffect } from 'react'
import { useSession, signIn, getCsrfToken  } from "next-auth/react"
import Loginform from '../../components/Loginform'
import { useRouter } from 'next/router'
import { signOut } from "next-auth/react";
type Props = {}

function index({}: Props) {
  const { data: session } = useSession()
  const router = useRouter();
  if (session) {
    return(
      <div className='w-full min-h-full flex justify-center items-center'>
        <div className='shadow-2xl bg-white ml-[-115px] w-[400px] h-fit rounded-[15px] p-10 flex flex-col'>
          <h1 className='text-2xl mb-5'>Welcome {session.user?.name}</h1>
          <button className='bg-red-500 p-2 text-white font-bold rounded-md' onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    )
  }
  else{
    router.push("/user/login")
  }
}

export default index