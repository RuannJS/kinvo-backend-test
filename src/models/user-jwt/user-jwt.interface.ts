export interface UserJwt {
  data: {
    email: string;
    password: string;
  };
  iat: number;
}
