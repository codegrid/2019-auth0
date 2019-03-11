import { WebAuth } from 'auth0-js';
import jwtDecode from 'jwt-decode';

const webAuth = new WebAuth({
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  clientID: process.env.VUE_APP_AUTH0_CLIENT_ID,
  responseType: 'token id_token',
  redirectUri: process.env.VUE_APP_AUTH0_REDIRECT_URL,
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

export const getUserProfile = idToken => {
  return jwtDecode(idToken);
};
