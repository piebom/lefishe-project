import React, { useState } from 'react'
import { useForm, type SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import type { ILogin } from "../validation/auth";
type Props = {}

export default function Loginform({}: Props) {
    const router = useRouter();
    const { error } = router.query;
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ILogin>();
  
    const onSubmit: SubmitHandler<ILogin> = async (data) => {
      await signIn("credentials", { ...data, callbackUrl: "/user" });
    };
  return (
    <div className='shadow-2xl bg-white ml-[-115px] w-[400px] h-fit rounded-[15px] p-10 flex flex-col'>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {error && (
          <p className="text-center text-red-600">Login failed, try again!</p>
        )}
        <h1 className='text-2xl mb-5'>Login</h1>
        <label className='font-bold'>Email</label>
        <input
          className="bg-[#FAF9F6] p-2 rounded-lg mt-2"
          type="text"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <label className='font-bold'>Password</label>
        <input
          className="bg-[#FAF9F6] p-2 rounded-lg mt-2"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}

        <input type="submit" className=' mt-5 w-full bg-[#6A8E7F] p-3 text-white font-bold rounded-lg' />
        <div className='w-full bg-gray-300 h-[1px] mt-5'></div>
        <label className='text-center mt-3'>Need an account? <a className='underline' href='/user/register'>Sign up</a></label>

      </form>  </div>
  )
}