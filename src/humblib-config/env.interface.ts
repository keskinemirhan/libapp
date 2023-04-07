export interface DatabaseEnv {
  type: string;
  database: string;
  port?: number;
  host?: string;
  username?: string;
  password?: string;
  synchronize?: boolean;
}
