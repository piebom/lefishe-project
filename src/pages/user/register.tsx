import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Registerform from "../../components/Registerform";
import { motion, useIsPresent } from "framer-motion";
function Register() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/user");
  }
  const isPresent = useIsPresent();
  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center">
        <Registerform />
      </div>
    </>
  );
}

export default Register;
