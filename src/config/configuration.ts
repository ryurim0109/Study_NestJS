export interface Configuration {
  app: { port: number };
  database: { uri: string };
}

export default function configuration(): Configuration {
  const port = Number(process.env.PORT ?? 8000);
  const uri = process.env.MONGODB_URI?.trim();

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }

  if (!uri || !/^mongodb(?:\+srv)?:\/\//.test(uri)) {
    throw new Error('MONGODB_URI must be a MongoDB connection URI');
  }

  return {
    app: { port },
    database: { uri },
  };
}
