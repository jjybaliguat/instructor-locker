// @ts-nocheck
import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
  ],
  database: process.env.DATABASE_URL,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/',
  },
  callbacks: {
    async signIn(user, account, profile) {
      if (account.provider === 'google' &&
          profile.verified_email === true) {
        return true
      } else {
        return false
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};