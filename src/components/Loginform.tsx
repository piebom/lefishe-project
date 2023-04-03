import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import type { ILogin } from "../validation/auth";
import Link from "next/link";

export default function Loginform() {
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
    <div className="flex h-fit w-[400px] flex-col rounded-[15px] bg-white p-10 shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {error && (
          <p className="text-center text-red-600">Login failed, try again!</p>
        )}
        <h1 className="mb-5 text-2xl">Login</h1>
        <label className="font-bold">Email</label>
        <input
          className="mt-2 rounded-lg bg-[#FAF9F6] p-2"
          type="text"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <label className="font-bold">Password</label>
        <input
          className="mt-2 rounded-lg bg-[#FAF9F6] p-2"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}

        <input
          type="submit"
          className=" mt-5 w-full rounded-lg bg-[#6A8E7F] p-3 font-bold text-white"
        />
        <div className="mt-5 h-[1px] w-full bg-gray-300"></div>
        <label className="mt-3 text-center">
          Need an account?{" "}
          <Link className="underline" href="/user/register">
            Sign up
          </Link>
        </label>
      </form>{" "}
    </div>
  );
}
