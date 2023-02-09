import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import Registerform from '../../components/Registerform'
import {motion,useIsPresent} from "framer-motion"
type Props = {}

function register({}: Props) {
  const { data: session } = useSession()
  const router = useRouter()
  if(session)
  {
    router.push("/user")
  }
  const isPresent = useIsPresent();
  return (
    <>
    <div className='w-full min-h-screen flex justify-center items-center'>
      <Registerform/>
    </div>
    </>
  )
}

export default register