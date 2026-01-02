export enum OnboardingStep {
  LANDING = 'LANDING',
  WAITLIST = 'WAITLIST',
  INVITE_CODE = 'INVITE_CODE',
  AUTH_SELECTION = 'AUTH_SELECTION',
  DASHBOARD = 'DASHBOARD'
}

export enum AuthProvider {
  EMAIL = 'email',
  GOOGLE = 'google',
  GITHUB = 'github',
  APPLE = 'apple'
}

export interface UserProfile {
  name?: string;
  email?: string;
  provider?: string;
  inviteCode?: string;
  avatarUrl?: string;
}

export interface Session {
  user: UserProfile;
  expires: string;
}

export interface GenerateWelcomeResponse {
  message: string;
  role: string;
}