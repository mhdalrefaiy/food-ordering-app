'use client'
import Image from "next/image";
import { useState } from "react";

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleFormSubmit(e) {
        e.preventDefault()
        fetch('/api/signup',{
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'}
        })
    }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Sign up</h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit} >
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value) } />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value) } />
        <button type="submit">Sign up</button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button className="flex gap-4 justify-center" >
          <Image src={"/google.png"} alt={""} width={24} height={24} />
          Login with google
        </button>
      </form>
    </section>
  );
}
