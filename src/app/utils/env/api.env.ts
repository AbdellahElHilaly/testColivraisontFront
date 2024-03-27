const version = {
  VERSION_1: '/v1',
  VERSION_2: '/v2',
  VERSION_3: '/v3',
}

const BACK_END_URL = 'http://localhost:8080';
// const BACK_END_URL = 'https://testcolivraisonbackend-2.onrender.com';

const apiVersions = version.VERSION_1;

const BASE_URL = BACK_END_URL + '/api' + apiVersions;

export const endpoints = {

  ADMIN: BASE_URL + '/admin',
  VENDOR: BASE_URL + '/vendor',
  SUPER_ADMIN: BASE_URL + '/super-admin',
  LIVREUR: BASE_URL + '/livreur',

  SEEDER: '/seeders',
  USER: '/users',
  ROLE: '/roles',
  STATUS: '/status',
  REMARQUE: '/remarques',
  COLI: '/colis',
  CITY: '/cities',
  ZONE: '/zones',
  STORE_CITY: '/store-cities',
  RATE: '/rates',



  AUTH: BASE_URL + '/auth',
  LOGIN: '/login',
  REGISTER: '/register',
  REFRESH_TOKEN: '/refresh',
  TEST_TOKEN: '/test-token',
  ROLES: '/roles',
  PRINCIPAL: '/principal',
  PROFILE: '/profile',


};

export const subEndpoints = {
  PICKED_UP: 'picked-up',
  PICKING_UP: 'picking-up',
  CANCEL_PICKED_UP: 'cancel-pickup',
  STATISTICS: 'statistics',
}

export const superAdminEndpoints = {
  USERS: endpoints.SUPER_ADMIN + endpoints.USER,
  ROLES: endpoints.SUPER_ADMIN + endpoints.ROLE,
  SEEDERS: endpoints.SUPER_ADMIN + endpoints.SEEDER,
  STATUSES: endpoints.SUPER_ADMIN + endpoints.STATUS,
  CITIES: endpoints.SUPER_ADMIN + endpoints.CITY,
  ZONES: endpoints.SUPER_ADMIN + endpoints.ZONE,
  COLIS: endpoints.SUPER_ADMIN + endpoints.COLI,
  STORE_CITIES: endpoints.SUPER_ADMIN + endpoints.STORE_CITY,
  RATES: endpoints.SUPER_ADMIN + endpoints.RATE
};

export const vendorEndpoints = {
  COLIS: endpoints.VENDOR + endpoints.COLI,
  CITY: endpoints.VENDOR + endpoints.CITY,
};

export const authEndpoints = {
  LOGIN: endpoints.AUTH + endpoints.LOGIN,
  REGISTER: endpoints.AUTH + endpoints.REGISTER,
  REFRESH_TOKEN: endpoints.AUTH + endpoints.REFRESH_TOKEN,
  TEST_TOKEN: endpoints.AUTH + endpoints.TEST_TOKEN,
  PROFILE: endpoints.AUTH + endpoints.PROFILE,
};
