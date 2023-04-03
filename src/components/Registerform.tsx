import React, { useState } from "react";
import { useSession, signIn, getCsrfToken } from "next-auth/react";
import { api } from "../utils/api";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { IRegister } from "../validation/auth";
import { useRouter } from "next/router";
import Link from "next/link";

function Registerform() {
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
    <div className="flex h-fit w-[400px] flex-col rounded-[15px] bg-white p-10 shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {errorMessage && (
          <p className="text-center text-red-600">{errorMessage}</p>
        )}
        <h1 className="mb-5 text-2xl">Register</h1>
        <label className="font-bold">Name</label>
        <input
          className="mt-2 rounded-lg bg-[#FAF9F6] p-2"
          type="username"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <p className="text-center text-red-600">This field is required</p>
        )}
        <label className="font-bold">Email</label>
        <input
          className="mt-2 rounded-lg bg-[#FAF9F6] p-2"
          type="text"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-center text-red-600">This field is required</p>
        )}
        <label className="font-bold">Password</label>
        <input
          className="mt-2 rounded-lg bg-[#FAF9F6] p-2"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-center text-red-600">This field is required</p>
        )}

        <input
          type="submit"
          className=" mt-5 w-full rounded-lg bg-[#6A8E7F] p-3 font-bold text-white"
        />
        <div className="mt-5 h-[1px] w-full bg-gray-300"></div>
        <label className="mt-3 text-center">
          Do you already have an account?{" "}
          <Link className="underline" href="/user/login">
            Sign in
          </Link>
        </label>
      </form>
    </div>
  );
}

export default Registerform;
