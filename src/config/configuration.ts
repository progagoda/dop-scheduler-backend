export interface ConfigProps {
  port: number;
  auth: {
    secret_key: string;
  };
}

export const config = (): ConfigProps => ({
  port: Number(process.env.PORT),
  auth: {
    secret_key: process.env.SECRET_KEY,
  },
});
