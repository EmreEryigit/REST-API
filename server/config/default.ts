export default {
    port: 1337,
    dbUri: "mongodb://localhost:27017/rest-api-tutorial",
    origin: "http://localhost:3000",
    googleClientId:
        "496135124413-7bhlhc7mf6u42f7n0ielt2j970atabg6.apps.googleusercontent.com",
    googleClientSecret: "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",
    googleOauthRedirectUrl: "http://localhost:1337/api/sessions/oauth/google",
    saltWorkFactor: 10,
    accessTokenTtl: "15m",
    refreshTokenTtl: "1y",
    publicKey: `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHh0XuNaKyoOT6TgLw+n3mbWk0dF
lpX3vzUUaVtWX1cVhcFzpwk/yseTyMpwW5ZIlVv03Eo65RvCM5eBcALckX8w3H75
l9YKted1pkX9mxIsN5WJy3C3jf9vG7BtsZTsgB6b/iuIp578+td7rBrBK7A6wGHr
vij2JTXEqOi2zQ3nAgMBAAE=
-----END PUBLIC KEY-----`,
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgHh0XuNaKyoOT6TgLw+n3mbWk0dFlpX3vzUUaVtWX1cVhcFzpwk/
yseTyMpwW5ZIlVv03Eo65RvCM5eBcALckX8w3H75l9YKted1pkX9mxIsN5WJy3C3
jf9vG7BtsZTsgB6b/iuIp578+td7rBrBK7A6wGHrvij2JTXEqOi2zQ3nAgMBAAEC
gYBlhRbQIRfOGz+u4y9mz4HXRLPeVt0iyiqCDxD45SP3nnEb6WB3oCdE695IGEho
sgYH+aiMe3TLX3LiFzqTfti0m/kJN6GToAm4pg7zlNtBb6aWW3M9LVP84kx0mPje
q+y3aVTNiiJI3DdDa8SWuvR5P4ENoqgbgQ4Y/5InMG39+QJBAOFMD5jShxT8lwlW
zXcUNIBHJOzk1K3nq8k9h5B2nVP7y5Xu4JEjVm16h49JlL05kViyOZZahKRbAyf8
LZNixKUCQQCI3qssICqvffVdhde2+EuUkhvjvqaHMxGpaWzC3HKojSImbFOdlvKU
QYIsUQLZhLZDWd68NSGpJIYhsO5i+aabAkEAz5tOWA3P6lfkOffh99QHmRl1/lHT
ZbkxBI0NaeLTkTta2/u2tiexEcsyNaihRklRFUGObW1WAznWy7bGrKT7/QJAZt/O
ktT+oHcxNIFEOR95V4tWcSC8dERbUxWNjQ07FRs3ft/PHVT2sZ5nZD3jwXCxuf/T
nWzmBwcP1kTxeO0iXwJAB8/TJVr20IQKiB9uFJJBIuHezCNWjwN+MHy8Lu62y6Cu
kMwxtVZbCAc6nL43YXfKk4Ygma8Mfj6r7jSnlFABIg==
-----END RSA PRIVATE KEY-----`,
};
