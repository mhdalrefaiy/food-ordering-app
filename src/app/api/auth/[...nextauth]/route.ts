import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          id: 'credentials',
          credentials: {
            username: { label: "Email", type: "email", placeholder: "example@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            console.log({credentials});
            
            return null
          }
        })
      ]
})

export { handler as GET, handler as POST }