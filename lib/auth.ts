import { betterAuth } from "better-auth";
import { pool, email } from "./external";
import { PASSWORD_POLICY } from "./config";
 
export const auth = betterAuth({
    database: pool,
    emailAndPassword: {    
      enabled: true,
      requireEmailVerification: true,
      minPasswordLength: PASSWORD_POLICY.minLength,
      maxPasswordLength: PASSWORD_POLICY.maxLength,
    },
    emailVerification: {
      autoSignInAfterVerification: true,
      sendOnSignUp: true,
      sendVerificationEmail: async ( { user, url, token }, request) => {
        console.log("test")
        await email.sendMail({
            from: "test@example.com",
            to: user.email,
            subject: "Verify your email address",
            text: `Click the link to verify your email: ${url}`,
          });
      },
    },
})