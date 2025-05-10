// @ts-nocheck
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client";
import { FirestoreAdapter } from "@auth/firebase-adapter"
import { hashPassword } from "@/utils/hashPassword"
import { cert } from "firebase-admin/app"
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const options = {
  adapter: PrismaAdapter(prisma),
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  }),
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: {},
            password:{},
        },
        async authorize(credentials) {
            try {
              // console.log(credentials)
                if(!credentials?.email || !credentials.password){
                  return null
                }
                const user = await prisma.user.findUnique({
                  where: {
                    email: credentials.email
                  },
                  include: {
                    instructor: true,
                    admin: true
                  }
                });

                // console.log(user)
                if (!user) {
                    throw new Error("")
                }
                const isValidPassword = await bcrypt.compare(
                    credentials?.password ?? "", user.password as string
                ); 
                if (!isValidPassword) {
                  throw new Error("Invalid Credentials")
                }
                return user;
            }
            catch {
                return null
            }
        }
    })
  ],
  // database: process.env.DATABASE_URL,
  session: {
    strategy: "jwt",
  },
  session: {
    strategy: "jwt", // Use JWT for session storage
    maxAge: 60*60, // 1hr expiration if inactive
    updateAge: 15*60, // update every 15mins
  },
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    /**
     * Controls if the user is allowed to sign in.
     * In this example, the user must have a verified email with Google.
     */
    async signIn({ account, profile, user }) {
      if (account?.provider === 'google') {
        if (profile?.email_verified) {
          const existingUser = await prisma.user.findUnique({
            where: {
              email: profile.email
            },
            include: {
              instructor: true,
              admin: true
            }
          })      
          if(!existingUser){
            // const user = await prisma.user.create({
            //   data: {
            //     email: profile.email,
            //     instructor: {
            //       name: profile.name,
            //     }
            //   }
            // })
          }
          return true
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
    async jwt({ token, account, user, trigger, session }) {
      // Persist the OAuth account and token details in the JWT
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user.email
          },
          include: {
            instructor: true,
            admin: true
          }
        })


        token.id = dbUser.id;
        token.name = dbUser.name;
        token.email = dbUser.email;
        token.role = dbUser.role;
        token.admin = dbUser?.admin
        token.instructor = {
          id: dbUser?.instructor?.id,
          name: dbUser?.instructor?.name,
          qrCode: dbUser?.instructor?.qrCode
        };
      }

      // ---> ADDITION <---
      if (trigger == "update") {
        if (session?.user?.name && session?.user?.email) {
          token.email = session.user.email,
          token.name = session.user.name

                // Optional: Re-fetch the instructor data to include updated qrCode
          const dbUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { instructor: true, admin: true },
          });

          token.instructor = {
            id: dbUser?.instructor?.id,
            name: dbUser?.instructor?.name,
            qrCode: dbUser?.instructor?.qrCode,
          };
        }
      }
      

      return token;
    },
    

    /**
     * Called when the session is checked (e.g. `useSession` or `getSession`).
     * You can customize what is available on the session object.
     */
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.admin = token.admin;
        session.user.instructor = {
          id: token?.instructor?.id,
          name: token?.instructor?.name,
          qrCode: token?.instructor?.qrCode
        };
      }

      return session;
    },
    
    /**
     * Called during account creation.
     * You can add logic here to modify the user record in the database.
     */
    // async createUser({ user }) {
    //   // You can perform actions here when a new user is created.
    //   // For example, log user creation or assign custom roles
    //   console.log(`User created: ${user.name}`);
    //   return user;
    // },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development"
};