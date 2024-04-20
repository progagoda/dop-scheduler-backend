export interface ConfigProps {
  port: number;
  auth: {
    secret_key: string;
  };
}

export const config = (): ConfigProps => ({
  port: parseInt(process.env.PORT) || 8080,
  auth: {
    secret_key: process.env.SECRET_KEY,
  },
});
