// shopify-config.js

const Shopify = require("@shopify/shopify-api").Shopify;
const ApiVersion = require("@shopify/shopify-api").ApiVersion;
const dotenv = require("dotenv");
dotenv.config();


Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET_KEY,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.APP_HOST.replace(/https:\/\//, ""),
  API_VERSION: ApiVersion.October20,
  IS_EMBEDDED_APP: false,
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

module.exports = Shopify;