import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session {
    user: {
        id: string,
        name: string,
        email: string,
        image?: string,
        role: UserRole,
        semaphoreKey?: SemaphoreKey,
        companyName?: string,
        companyAddress?: string
    } & DefaultSession["user"];
  }

  interface User {
    id: string,
    name: string,
    email: string,
    image?: string,
    role: UserRole,
    semaphoreKey?: SemaphoreKey,
    companyName?: string,
    companyAddress?: string
  }

  interface SemaphoreKey {
    id: string,
    key: string
  }

  export enum UserRole {
    ADMIN = "ADMIN",
    OPERATOR = "OPERATOR",
    USER = "USER",
  }
}