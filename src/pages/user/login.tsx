import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Loginform from "../../components/Loginform";
import { motion, useIsPresent } from "framer-motion";

function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/user");
  }
  const isPresent = useIsPresent();
  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loginform />
      </div>
    </>
  );
}

export default Login;
