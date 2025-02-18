import NextAuth from "next-auth";
import { pool } from "./lib/data";
import PostgresAdapter from "@auth/pg-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";

export const { handlers, auth, signIn, signOut } = NextAuth({
    // TODO Add this when social login: adapter: PostgresAdapter(pool),
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email", placeholder: "example@example.com" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
              throw new Error("Missing email or password");
            }
    
            try {
              const client = await pool.connect();
              const res = await client.query("SELECT * FROM auth_users WHERE email = $1", [credentials.email]);
              client.release();
    
              if (res.rows.length === 0) {
                throw new Error("No user found");
              }
    
              const user = res.rows[0];
              const isValid = await bcrypt.compare(credentials.password, user.password_hash);
    
              if (!isValid) {
                throw new Error("Invalid credentials");
              }
    
              return {
                id: user.id.toString(),
                name: user.name,
                email: user.email,
              };
            } catch (error) {
              console.error("Authentication error:", error);
              throw new Error("Authentication failed");
            }
          },
        }),
    ],
    pages: {
      signIn: "/auth/signin",
    },
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
  })