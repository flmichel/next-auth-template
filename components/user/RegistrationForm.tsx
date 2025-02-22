"use client";

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
import { PASSWORD_POLICY } from "@/lib/config";
import CenteredContainer from "../CenteredContainer";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z
    .string()
    .min(PASSWORD_POLICY.minLength, {
      message: `Password must be at least ${PASSWORD_POLICY.minLength} characters.`,
    })
    .max(PASSWORD_POLICY.maxLength, {
      message: `Password must be at most ${PASSWORD_POLICY.maxLength} characters.`,
    }),
});

interface RegistrationFormProps {
  setEmail: (email: string) => void;
}

// Using function declaration
export function RegistrationForm({ setEmail }: RegistrationFormProps) {
  const [genericError, setGenericError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
      },
      {
        onRequest: () => {
          setIsRegistering(true);
        },
        onSuccess: () => {
          setEmail(values.email);
        },
        onError: (ctx) => {
          setIsRegistering(false);
          if (ctx.error.code === "USER_ALREADY_EXISTS") {
            form.setError("email", {
              type: "manual",
              message: "The is already an account using this email address",
            });
          } else {
            setGenericError(ctx.error.message);
          }
        },
      }
    );
  }

  return (
    <CenteredContainer>
      <h2 className="text-2xl font-bold mb-6 text-center">Create an account</h2>
      {genericError && (
        <p className="text-red-500 text-sm mb-4">{genericError}</p>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          {genericError && (
            <p className="text-red-500 text-sm mb-4">{genericError}</p>
          )}
          <Button
            type="submit"
            className="w-full px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300"
            disabled={isRegistering}
          >
            {isRegistering ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>

      <p className="text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Log in here
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
