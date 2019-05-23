import { WebAuth } from 'auth0-js';
import jwtDecode from 'jwt-decode';

if (!process.env.VUE_APP_AUTH0_DOMAIN) {
  throw new Error('環境変数 VUE_APP_AUTH0_DOMAIN が設定されていません。');
}
if (!process.env.VUE_APP_AUTH0_CLIENT_ID) {
  throw new Error('環境変数 VUE_APP_AUTH0_CLIENT_ID が設定されていません。');
}
if (!process.env.VUE_APP_AUTH0_REDIRECT_URL) {
  throw new Error('環境変数 VUE_APP_AUTH0_REDIRECT_URL が設定されていません。');
}

const webAuth = new WebAuth({
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  clientID: process.env.VUE_APP_AUTH0_CLIENT_ID,
  responseType: 'id_token',
  redirectUri: process.env.VUE_APP_AUTH0_REDIRECT_URL,
  scope: 'openid profile email',
});

export const login = () => {
  webAuth.authorize();
};

export const getAuthResult = async () => {
  return new Promise((resolve, reject) => {
    webAuth.parseHash((err, authResult) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(authResult);
    });
  });
};

export const getAuthResultByRenewTokens = async () => {
  return new Promise((resolve, reject) => {
    webAuth.checkSession({}, (err, authResult) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(authResult);
    });
  });
};

export const getUserProfile = idToken => {
  return jwtDecode(idToken);
};
