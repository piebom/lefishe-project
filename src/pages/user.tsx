import React from 'react'
import { useSession, signIn, getCsrfToken  } from "next-auth/react"
type Props = {}

function user({}: Props) {
  const { data: session } = useSession()
  if (session) {
  }
  return (
    <>
    <div className='w-full min-h-full flex justify-center items-center'>
      <div className='shadow-2xl bg-white ml-[-115px] w-[400px] h-fit rounded-[15px] p-10 flex flex-col'>
        <h1 className='text-2xl mb-5'>Login</h1>
        <label className='font-bold'>Username</label>
        <input className='mb-5 bg-[#FAF9F6] p-2 rounded-lg mt-2'></input>
        <label className='font-bold'>Password</label>
        <input className='mb-5 bg-[#FAF9F6] p-2 rounded-lg mt-2'></input>
        <button onClick={() => signIn("credentials", { username: "jsmith", password: "1234" })} className='w-full bg-[#6A8E7F] p-3 text-white font-bold rounded-lg'>Sign in</button>
        <div className='w-full bg-gray-300 h-[1px] mt-5'></div>
        <label className='text-center mt-3'>Need an account? <a className='underline' href='/signup'>Sign up</a></label>
      </div>
    </div>
    </>
  )
}

export default user