import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { UserData } from "@/app/register/page";
import CenteredContainer from "./CenteredContainer";

interface EmailVerificationProps {
  userData: UserData;
}

export function EmailVerification({ userData }: EmailVerificationProps) {
  const [isResending, setIsResending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleResendEmail = async () => {
    setIsResending(true);
    setStatusMessage(null);

    await authClient.sendVerificationEmail({
      email: userData.email,
      callbackURL: "/",
    });
  };

  return (
    <CenteredContainer>
      <h1 className="text-2xl font-semibold mb-4">Please verify your email</h1>
      <p className="text-lg mb-4">
        We just sent an email to <strong>{userData.email}</strong>.
        <br />
        Click the link in the email to verify your account.
      </p>

      <div className="mb-4">
        {statusMessage && (
          <p
            className={`text-lg ${
              statusMessage.includes("error")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {statusMessage}
          </p>
        )}
      </div>

      <div>
        <button
          onClick={handleResendEmail}
          disabled={isResending}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-3"
        >
          {isResending ? "Resending..." : "Resend Email"}
        </button>
      </div>
    </CenteredContainer>
  );
}
