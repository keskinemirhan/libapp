export default () => {
  const runEnv = process.env.RUN_ENV;
  if (runEnv) {
    switch (runEnv) {
      case "devlocal":
        return {
          port: parseInt(process.env.PORT, 10) || 3000,
          database: {
            database: process.env.DATABASE_NAME || "db.sqlite",
            type: "sqlite",
            synchronize: process.env.SYNCHRONIZE || true,
          },
        };
      case "dev":
        return {
          port: parseInt(process.env.PORT, 10) || 3000,
          database: {
            database: "humblib",
            type: "postgres",
            host: process.env.DATABASE_HOST || "localhost",
            port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
            username: process.env.DATABASE_USER || "humblib",
            password: process.env.DATABASE_PASS || "humblib",
          },
        };
      case "prod":
        return;
    }
  } else {
    return {
      port: parseInt(process.env.PORT, 10) || 3000,
      database: {
        database: process.env.DATABASE_NAME,
        type: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_HOST || undefined,
        port: parseInt(process.env.DATABASE_PORT, 10) || undefined,
        username: process.env.DATABASE_USER || undefined,
        password: process.env.DATABASE_PASS || undefined,
        synchronize: process.env.SYNCHRONIZE || false,
      },
    };
  }
};
