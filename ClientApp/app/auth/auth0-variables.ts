interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'TuobB4Ga10823ud70g0Nf63Y4ZSOQHOm',
  domain: 'pgengel.auth0.com',
  callbackURL: 'http://localhost:5000/home'
};