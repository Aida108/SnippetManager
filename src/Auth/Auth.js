import history from '../history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import jwt_decode from 'jwt-decode';
export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid profile email phone '

  });
  userProfile;
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
  this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
         var decoded = jwt_decode(authResult.idToken);
          localStorage.setItem('sub', decoded.sub);
          console.log(authResult.idToken);
var data =
{client_id: 'DKQIQKtrUuhPrVyCsOJ0OR4y5s2sm8J1',
client_secret:'S-GnsMvPaclcn5cXdL8lLYIfy9QUl8oG0EFz6jHUBMAyZe_mQ1utaujLEleex3Hs',
audience:'https://snippetmanager.eu.auth0.com/api/v2/',
grant_type:'client_credentials'};
var oauthToken;
          fetch('https://snippetmanager.eu.auth0.com/oauth/token', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
          },
             body: JSON.stringify(data)
            }).then(function(response) {
                return response.json();
            }).then(function(body) {
                      console.log(body)
                console.log(body.access_token)

fetch('https://snippetmanager.eu.auth0.com/api/v2/users/'+ decoded.sub, {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + body.access_token,
  }
  }).then(function(response) {
      return response.json();
  }).then(function(body) {
      localStorage.setItem('githubApi_token',body.identities[0].access_token)

  });
            });



        this.auth0.client.userInfo(authResult.accessToken, function(err, user){
              localStorage.setItem('user', user);
        });
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult, ) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('user_nick_name', authResult.idTokenPayload.nickname);
    // navigate to the home route
    history.replace('/home');
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile(cb) {
      let accessToken = this.getAccessToken();
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          this.userProfile = profile;
        }
        cb(err, profile);
      });
    }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this.userProfile = null;
    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
