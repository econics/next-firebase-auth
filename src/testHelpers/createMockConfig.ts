/* eslint-env jest */

const createMockConfig = ({ clientSide }: { clientSide?: boolean } = {}) => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const isClientSide = require('src/isClientSide').default
  const useClientSideConfig =
    typeof clientSide === 'undefined' ? isClientSide() : clientSide
  return {
    debug: false,
    loginAPIEndpoint: 'https://example.com/api/login',
    logoutAPIEndpoint: 'https://example.com/api/logout',
    onVerifyTokenError: jest.fn(),
    onTokenRefreshError: jest.fn(),
    authPageURL: '/login',
    appPageURL: '/',
    firebaseAdminInitConfig: useClientSideConfig
      ? undefined
      : {
          credential: {
            projectId: 'my-example-app',
            clientEmail: 'my-example-app@example.com',
            privateKey: 'fakePrivateKey123',
          },
          databaseURL: 'https://my-example-app.firebaseio.com',
        },
    firebaseClientInitConfig: {
      apiKey: 'fakeAPIKey123',
      authDomain: 'my-example-app.firebaseapp.com',
      databaseURL: 'https://my-example-app.firebaseio.com',
      projectId: 'my-example-app-id',
    },
    firebaseClientAppName: 'example-app-name',
    cookies: {
      name: 'someExample',
      keys: useClientSideConfig ? [] : ['abc', 'def'],
      domain: undefined,
      httpOnly: true,
      maxAge: 172800, // two days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true,
      signed: true,
    },
  }
}

export default createMockConfig
