export type AuthState = {
  loading: boolean;
  user: any;
  showIntroScreen: boolean;
  typeUser: any;
};

export const INITIAL_STATE_AUTH: AuthState = {
  loading: false,
  user: null,
  showIntroScreen: true,
  typeUser: 0,
};
