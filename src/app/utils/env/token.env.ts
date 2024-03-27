const getTokenExpirationDate = (days: number, hours: number, minutes: number, seconds: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(date.getHours() + hours);
  date.setMinutes(date.getMinutes() + minutes);
  date.setSeconds(date.getSeconds() + seconds);
  return date;
}


const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const ACCESS_TOKEN_ENV = {
  KEY: ACCESS_TOKEN_KEY,
  EXPIRATION: getTokenExpirationDate(1, 0, 0, 0),
  PATH: '/',
  DOMAIN: undefined,
  SECURE: false,
  SAME_SITE: 'Strict'
}

export const REFRESH_TOKEN_ENV = {
  KEY: REFRESH_TOKEN_KEY,
  EXPIRATION: getTokenExpirationDate(15, 0, 0, 0),
  PATH: '/',
  DOMAIN: undefined,
  SECURE: false,
  SAME_SITE: 'Strict'
}

export const AUTHORITY_ENV = {
  KEY: 'authority',
  EXPIRATION: getTokenExpirationDate(15, 0, 0, 0),
  PATH: '/',
  DOMAIN: undefined,
  SECURE: false,
  SAME_SITE: 'Strict'
}

