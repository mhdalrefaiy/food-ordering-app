"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../AppContext";
export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  const {cartProducts} =  useContext(CartContext)
  let userName = userData?.name || userData?.email;

  if(userName && userName.includes(' ')) {
    userName = userName.split(' ')[0]
  }

  return (
    <>
      <header className="flex items-center justify-between">
        <nav className="flex gap-8 items-center text-gray-500 font-semibold ">
          <Link className="text-primary font-semibold text-2xl " href={"/"}>
            ST PIZZA
          </Link>
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Content</Link>
        </nav>

        <nav className="flex items-center gap-4 text-gray-500 font-semibold ">
          {status === "authenticated" && (
            <>
              <Link href={"/profile"} className="whitespace-nowrap" >Hello, {userName}</Link>
              <button
                className="bg-primary text-white rounded-full px-8 py-2"
                onClick={() => {
                  signOut();
                }}
              >
                Log out
              </button>
            </>
          )}
          {status !== "authenticated" && (
            <>
              <Link href={"/login"}>Login</Link>
              <Link
                className="bg-primary text-white rounded-full px-8 py-2"
                href={"/signup"}
              >
                Sign up
              </Link>
            </>
          )}
          <Link href={'/cart'} >Cart ({cartProducts?.length})</Link>
        </nav>
      </header>
    </>
  );
}
