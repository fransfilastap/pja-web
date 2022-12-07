export const ENV = process.env.NEXT_PUBLIC_APP_ENVIRONMENT || 'production';
export const PROD_URL = 'https://fransfp.dev';
export const BASE_URL = ENV !== 'production' ? `http://localhost:${process.env.PORT}` : PROD_URL;
export const UMAMI_ID = process.env.UMAMI_ID;
