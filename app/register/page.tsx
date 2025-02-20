"use client";

import { useState } from "react";
import { RegistrationForm } from "@/components/RegistrationForm";
import { EmailVerification } from "@/components/EmailVerification";

export type UserData = {
  name: string;
  email: string;
};

export default function Register() {
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <>
      {!userData ? (
        <RegistrationForm setUserData={setUserData} />
      ) : (
        <EmailVerification userData={userData} />
      )}
    </>
  );
}
