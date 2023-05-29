export const ENV = process.env.NEXT_PUBLIC_APP_ENVIRONMENT || 'production';
export const PROD_URL = 'https://pja.bphn.go.id';
export const BASE_URL = ENV !== 'production' ? `http://localhost:${process.env.PORT}` : PROD_URL;
export const UMAMI_ID = process.env.UMAMI_ID;
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
export const DISQUS_SHORTNAME= process.env.NEXT_PUBLIC_DISQUS_SHORTNAME
export const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_KEY
export const TURNSTILE_SECRET=process.env.NEXT_PUBLIC_TURNSTILE_SECRET