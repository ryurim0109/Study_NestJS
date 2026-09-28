import configuration from '@config/configuration';

describe('configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, MONGODB_URI: 'mongodb://localhost/test' };
    delete process.env.PORT;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('defaults to port 8000 and reads the database URI', () => {
    expect(configuration()).toEqual({
      app: { port: 8000 },
      database: { uri: 'mongodb://localhost/test' },
    });
  });

  it('converts PORT to a number', () => {
    process.env.PORT = '3000';
    expect(configuration().app.port).toBe(3000);
  });

  it.each(['', 'abc', '3000abc', '1.5', '0', '-1', '65536'])(
    'rejects invalid PORT %j',
    (port) => {
      process.env.PORT = port;
      expect(configuration).toThrow('PORT must be an integer');
    },
  );

  it.each([undefined, '', '   ', 'https://localhost/test'])(
    'rejects invalid MONGODB_URI %j',
    (uri) => {
      if (uri === undefined) delete process.env.MONGODB_URI;
      else process.env.MONGODB_URI = uri;
      expect(configuration).toThrow(
        'MONGODB_URI must be a MongoDB connection URI',
      );
    },
  );

  it('accepts a MongoDB SRV URI', () => {
    process.env.MONGODB_URI = 'mongodb+srv://example.com/test';
    expect(configuration().database.uri).toBe(process.env.MONGODB_URI);
  });
});
