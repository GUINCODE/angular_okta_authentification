export const environment = {
  production: false,
  oktaAuth :{
  issuer: 'https://trial-3408718.okta.com/oauth2/default',
  clientId: '0oa8rpeexo7Gy4dpw697',
  redirectUri: 'http://localhost:4200/login/callback',
  postLogoutRedirectUri: 'http://localhost:4200/login',
  devMode: true,
  }
};