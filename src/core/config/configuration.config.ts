export default () => ({
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 8080,
  },
  mailer: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10) || 587,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    from: process.env.MAIL_FROM,
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    dbName: process.env.MYSQL_DB_NAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
  },
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET,
    apiUrl: process.env.PAYPAL_API_URL,
    returnUrl: process.env.PAYPAL_RETURN_URL,
    cancelUrl: process.env.PAYPAL_CANCEL_URL,
  },
  vnpay: {
    tmnCode: process.env.VNPAY_TMN_CODE,
    hashSecret: process.env.VNPAY_HASH_SECRET,
    apiUrl: process.env.VNPAY_API_URL,
    returnUrl: process.env.VNPAY_RETURN_URL,
  },
  momo: {
    partnerCode: process.env.MOMO_PARTNERCODE,
    accessKey: process.env.MOMO_ACCESS,
    secretKey: process.env.MOMO_SECRET,
    ipnUrl: process.env.MOMO_IPN_URL,
    returnUrl: process.env.MOMO_RETURN_URL,
  },
  zalo: {
    appId: process.env.ZALO_APP_ID,
    appSecret: process.env.ZALO_APP_SECRET,
  },
  facebook: {
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
    redirectUrl: process.env.FACEBOOK_REDIRECT_URL,
  },
  google: {
    appId: process.env.GOOGLE_APP_ID,
    appSecret: process.env.GOOGLE_APP_SECRET,
    redirectUrl: process.env.GOOGLE_REDIRECT_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    algorithm: process.env.JWT_ALGORITHM,
  },
})
