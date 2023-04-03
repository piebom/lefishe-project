import React, { useEffect, useState } from "react";
import { useSession, signIn, getCsrfToken } from "next-auth/react";
import Loginform from "../../components/Loginform";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { motion, useIsPresent } from "framer-motion";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
function Index() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") router.push("/user/login");
  }, [status]);
  if (session && status === "authenticated") {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <h1>welcome</h1>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <p>Access Denied</p>
    </div>
  );
}
export default Index;
