"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import FacebookIcon from "@/icons/facebook.svg";
import GoogleIcon from "@/icons/google.svg";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { PasswordInput } from "./PasswordInput";
import CenteredContainer from "../CenteredContainer";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(1, {
    message: `Password is empty`,
  }),
});

interface LoginFormProps {
  setEmail: (email: string) => void;
}

// Using function declaration
export function LoginForm({ setEmail }: LoginFormProps) {
  const router = useRouter();
  const [genericError, setGenericError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setIsLoggingIn(true);
        },
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          setIsLoggingIn(false);
          if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
            setEmail(values.email);
          } else {
            setGenericError(ctx.error.message);
          }
        },
      }
    );
  }

  return (
    <CenteredContainer>
      <h2 className="text-2xl font-bold mb-6 text-center">Log in</h2>
      {genericError && (
        <p className="text-red-500 text-sm mb-4">{genericError}</p>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </Form>

      <p className="text-center">
        Don't have an account?{" "}
        <Link href="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </p>

      <div className="flex items-center my-4">
        <hr className="flex-1 border-t border-gray-300" />
        <span className="mx-4 text-gray-600">or</span>
        <hr className="flex-1 border-t border-gray-300" />
      </div>

      <button className="flex items-center w-full px-4 py-2 mb-4 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition duration-300">
        <Image
          src={FacebookIcon}
          alt="Facebook"
          width={20}
          height={20}
          className="mr-2"
        />
        Continue with Facebook
      </button>
      <button className="flex items-center w-full px-4 py-2 rounded-md border border-black hover:bg-gray-200 transition duration-300">
        <Image
          src={GoogleIcon}
          alt="Google"
          width={20}
          height={20}
          className="mr-2"
        />
        Continue with Google
      </button>
    </CenteredContainer>
  );
}
