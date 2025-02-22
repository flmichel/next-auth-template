"use client";

import { useState } from "react";
import { RegistrationForm } from "@/components/user/RegistrationForm";
import { EmailVerification } from "@/components/user/EmailVerification";

export default function Register() {
  const [email, setEmail] = useState<string | null>(null);

  return (
    <>
      {!email ? (
        <RegistrationForm setEmail={setEmail} />
      ) : (
        <EmailVerification email={email} />
      )}
    </>
  );
}
