import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import Loginform from '../../components/Loginform'
import {motion,useIsPresent} from "framer-motion"
type Props = {}

function login({}: Props) {
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
      <Loginform/>
    </div>
    </>
  )
}

export default login