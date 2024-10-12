// @ts-nocheck
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const options = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
  ],
  // database: process.env.DATABASE_URL,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    /**
     * Controls if the user is allowed to sign in.
     * In this example, the user must have a verified email with Google.
     */
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        if (profile?.email_verified) {
          return true;  // Allow sign-in
        } else {
          return '/auth/error?error=EmailNotVerified';  // Redirect if email is not verified
        }
      }
      return true;
    },

    /**
     * Called when the JWT is created or updated.
     * You can add custom fields to the JWT token here.
     */
    async jwt({ token, account, user }) {
      // Persist the OAuth account and token details in the JWT
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
        token.provider = account.provider;
      }

      // Store the user ID from the database
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    /**
     * Called when the session is checked (e.g. `useSession` or `getSession`).
     * You can customize what is available on the session object.
     */
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;  // Attach user ID to session
        session.accessToken = token.accessToken;
      }

      return session;
    },
    
    /**
     * Called during account creation.
     * You can add logic here to modify the user record in the database.
     */
    async createUser({ user }) {
      // You can perform actions here when a new user is created.
      // For example, log user creation or assign custom roles
      console.log(`User created: ${user.name}`);
      return user;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};