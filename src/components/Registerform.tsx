import React, { useState } from 'react'
import { useSession, signIn, getCsrfToken  } from "next-auth/react"
import { api } from "../utils/api";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { IRegister } from "../validation/auth";
import { useRouter } from 'next/router';

type Props = {}

function Registerform({}: Props) {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const mutation = api.auth.register.useMutation({
        onError: (e) => setErrorMessage(e.message),
        onSuccess: () => router.push("/user/login"),
      });

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<IRegister>();

      const onSubmit: SubmitHandler<IRegister> = async (data) => {
        setErrorMessage(undefined);
        await mutation.mutateAsync(data);
      };
  return (
    <div className='shadow-2xl bg-white ml-[-115px] w-[400px] h-fit rounded-[15px] p-10 flex flex-col'>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {errorMessage && (
          <p className="text-center text-red-600">{errorMessage}</p>
        )}
        <h1 className='text-2xl mb-5'>Register</h1>
        <label className='font-bold'>Name</label>
        <input
          className="bg-[#FAF9F6] p-2 rounded-lg mt-2"
          type="username"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <p className="text-center text-red-600">This field is required</p>
        )}
        <label className='font-bold'>Email</label>
        <input
           className="bg-[#FAF9F6] p-2 rounded-lg mt-2"
          type="text"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-center text-red-600">This field is required</p>
        )}
        <label className='font-bold'>Password</label>
        <input
           className="bg-[#FAF9F6] p-2 rounded-lg mt-2"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-center text-red-600">This field is required</p>
        )}

        <input type="submit" className=' mt-5 w-full bg-[#6A8E7F] p-3 text-white font-bold rounded-lg' />
        <div className='w-full bg-gray-300 h-[1px] mt-5'></div>
        <label className='text-center mt-3'>Do you already have an account? <a className='underline' href='/user/login'>Sign in</a></label>

      </form>
  </div>
  )
}

export default Registerform