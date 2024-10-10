"use client"

import { signIn } from "next-auth/react";

export default function Home() {
    const handleSignin = async () => {
      await signIn("google", {
        redirect: false
      })
    }
  return (
    <>
    <main>
      <button onClick={handleSignin}>Sign In</button>
    </main>
    </>
  );
}
