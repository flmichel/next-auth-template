"use client";

import { EmailVerification } from "@/components/user/EmailVerification";
import { LoginForm } from "@/components/user/LoginForm";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string | null>(null);

  return email ? (
    <EmailVerification email={email} sendInitialEmail={true} />
  ) : (
    <LoginForm setEmail={setEmail} />
  );
}
