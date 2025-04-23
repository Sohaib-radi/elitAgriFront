export type UserType = Record<string, any> | null;

export type AuthState = {
  user: UserType;
  loading: boolean;
  permissions: string[];
};

export type AuthContextValue = {
  user: UserType;
  loading: boolean;
  authenticated: boolean;
  permissions: string[]; 
  unauthenticated: boolean;
  checkUserSession?: () => Promise<void>;
};
