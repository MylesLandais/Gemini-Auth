import { UserProfile, Session } from "../types";

// Configuration for BetterAuth
// In a real deployment, point this to your actual backend URL
const BASE_URL = "http://localhost:3000"; 

/**
 * Mocks the response structure of BetterAuth for the alpha demo.
 * In production, you would use the actual `better-auth/client` or fetch calls.
 */
export const authClient = {
  signIn: {
    social: async ({ provider, callbackURL }: { provider: 'google' | 'github' | 'apple' | 'discord', callbackURL?: string }) => {
      console.log(`[BetterAuth] Initiating ${provider} sign-in flow to ${BASE_URL}/api/auth/sign-in/${provider}`);
      
      // REAL IMPLEMENTATION:
      // window.location.href = `${BASE_URL}/api/auth/sign-in/${provider}?callbackURL=${callbackURL || window.location.origin}`;
      
      // DEMO IMPLEMENTATION:
      return new Promise<{ data: any, error: any }>((resolve) => {
        setTimeout(() => {
          resolve({
            data: { url: '/dashboard', success: true },
            error: null
          });
        }, 1200);
      });
    },
    
    email: async ({ email }: { email: string }) => {
      console.log(`[BetterAuth] Sending magic link to ${email}`);
      
      // REAL IMPLEMENTATION:
      // await fetch(`${BASE_URL}/api/auth/sign-in/email`, { 
      //   method: 'POST', 
      //   body: JSON.stringify({ email }) 
      // });

      // DEMO IMPLEMENTATION:
      return new Promise<{ data: any, error: any }>((resolve) => {
        setTimeout(() => {
          resolve({
            data: { success: true },
            error: null
          });
        }, 1000);
      });
    }
  },

  getSession: async () => {
    // REAL IMPLEMENTATION:
    // const res = await fetch(`${BASE_URL}/api/auth/session`);
    // return res.json();

    // DEMO IMPLEMENTATION:
    // Return null to simulate "Not Logged In" initially for the flow
    return new Promise<{ data: { session: Session | null, user: UserProfile | null } | null, error: any }>((resolve) => {
      setTimeout(() => {
        resolve({
          data: null, // Change this object to simulate a persisted login
          error: null
        });
      }, 500);
    });
  },

  signOut: async () => {
    console.log('[BetterAuth] Signing out');
    return new Promise((resolve) => setTimeout(resolve, 500));
  }
};