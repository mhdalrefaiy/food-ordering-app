"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
export default function Header() {
  const session = useSession();
  const status = session.status;
  console.log(session);
  return (
    <>
      <header className="flex items-center justify-between">
        <nav className="flex gap-8 items-center text-gray-500 font-semibold ">
          <Link className="text-primary font-semibold text-2xl " href={"/"}>
            ST PIZZA
          </Link>
          <Link href="">Home</Link>
          <Link href="">Menu</Link>
          <Link href="">About</Link>
          <Link href="">Content</Link>
        </nav>

        <nav className="flex items-center gap-4 text-gray-500 font-semibold ">
          {status === 'authenticated' && 
          <button className="bg-primary text-white rounded-full px-8 py-2" onClick={() => {signOut()}} >Log out</button>
          }
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
        </nav>
      </header>
    </>
  );
}
