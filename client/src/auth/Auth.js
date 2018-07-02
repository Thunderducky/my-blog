import auth0 from 'auth0-js';
import history from "../history"

const origin = window.location.origin;
export default class Auth {
  requestedScopes = 'openid profile read:blog write:blog'

  auth0 = new auth0.WebAuth({
    domain: 'coding-class.auth0.com',
    clientID: '9rQcd8ACuWllwprd3Vg5GtgzlPgcuCVn',
    redirectUri: origin + '/callback',
    audience: 'my-blog',
    //audience: 'https://coding-class.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: this.requestedScopes
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
 getAccessToken() {
   const accessToken = localStorage.getItem('access_token');
   if (!accessToken) {
     throw new Error('No Access Token found');
   }
   return accessToken;
 }

 userHasScopes(scopes){
   let _scopes = JSON.parse(localStorage.getItem("scopes")) || " ";
   console.log(_scopes);
   const grantedScopes = _scopes.split(' ');
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
 handleAuthentication() {
   this.auth0.parseHash((err, authResult) => {
     if (authResult && authResult.accessToken && authResult.idToken) {
       this.setSession(authResult);
       history.replace('/');
     } else if (err) {
       history.replace('/');
       console.log(err);
     }
   });
 }

 setSession(authResult) {
   // Set the time that the Access Token will expire at
   let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
   localStorage.setItem('access_token', authResult.accessToken);
   localStorage.setItem('id_token', authResult.idToken);
   localStorage.setItem('expires_at', expiresAt);

   const scopes = authResult.scope || this.requestedScopes || "";
   localStorage.setItem("scopes", JSON.stringify(scopes));

   // navigate to the home route
   history.replace('/home');
 }

 login() {
   this.auth0.authorize();
 }

 logout() {
   // Clear Access Token and ID Token from local storage
   localStorage.removeItem('access_token');
   localStorage.removeItem('id_token');
   localStorage.removeItem('expires_at');
   localStorage.removeItem('scopes');
   // navigate to the home route
   history.replace('/');
 }

 isAuthenticated() {
   // Check whether the current time is past the
   // Access Token's expiry time
   let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
   return new Date().getTime() < expiresAt;
 }

}
