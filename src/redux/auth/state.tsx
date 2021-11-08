export type AuthState = {
  loading: boolean;
  user: any;
  showIntroScreen: boolean;
  typeUser: 1 | 2 | 3;
};

export const INITIAL_STATE_AUTH: AuthState = {
  loading: false,
  user: null,
  showIntroScreen: true,
  typeUser: 1,
};
