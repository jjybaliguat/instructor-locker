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
        role: UserRole,
        instructor?: InstructorProfile,
        admin?: AdminProfile
    } & DefaultSession["user"];
  }

  interface InstructorProfile {
    id: string,
    name: string,
    qrCode: string
  }
  interface AdminProfile {
    id: string,
    name: string
  }

  interface User {
    id: string,
    name: string,
    email: string,
    role: UserRole,
    instructor?: InstructorProfile,
    admin?: AdminProfile
  }

  export enum UserRole {
    ADMIN = "ADMIN",
    OPERATOR = "INSTRUCTOR",
  }
}