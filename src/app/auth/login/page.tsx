"use client"

import { signIn, signOut } from "next-auth/react";

export default function LoginPage() {
    const handleSignin = async () => {
      await signIn("google")
    }
  return (
    <>
    <main>
      <button onClick={handleSignin}>Sign In</button>
      <button onClick={()=>signOut()}>Sign Out</button>
    </main>
    </>
  );
}
