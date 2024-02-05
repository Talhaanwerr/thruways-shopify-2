const Shopify = require("../config/shopify-config");
const { Shop } = require("../models");
const { getShopByShopUrl } = require("../utils/utils");

const ShopifyAuthController = async (req, res, next) => {
  const { shop } = req.query;
  const authRoute = await Shopify.Auth.beginAuth(
    req,
    res,
    shop,
    "/shopify/callback",
    false
  );
  res.redirect(authRoute);
};

const ShopifyCallbackController = async (req, res) => {
  const client_session = await Shopify.Auth.validateAuthCallback(
    req,
    res,
    req.query
  );
  const shop = req.query.shop;

  // Use the Shopify API to get the shop details
  const client = new Shopify.Clients.Rest(shop, client_session.accessToken);
  const shopData = await client.get({
    path: "shop",
  });
  // find if shop exists in db then update token else create new shop

  const shopObj = {
    name: shopData?.body?.shop?.name,
    shop_url: shopData?.body?.shop?.domain,
    shopify_token: client_session.accessToken,
  };

  const shopExists = getShopByShopUrl(
    "shop.json",
    shopData?.body?.shop?.domain
  );

  //   const shopExists = await Shop.findOne({
  //     where: {
  //       shop_url: shopData?.body?.shop?.domain,
  //     },
  //   });
  if (shopExists) {
    updateShopByUrl("shop.json", shopData?.body?.shop?.domain, shopObj);
    // await Shop.update(
    //   {
    //     shopify_token: client_session.accessToken,
    //   },
    //   {
    //     where: {
    //       shop_url: shop,
    //     },
    //   }
    // );
  } else {
    saveObjectsToFile("shop.json", shopObj);
    // const newShop = await Shop.create({
    //   name: shopData?.body?.shop?.name,
    //   shop_url: shopData?.body?.shop?.domain,
    //   shopify_token: client_session.accessToken,
    // });
  }

  const resp = await Shopify.Webhooks.Registry.register({
    shop,
    accessToken: client_session.accessToken,
    path: "/shopify/webhooks/app/uninstalled",
    topic: "APP_UNINSTALLED",
    webhookHandler: async (topic, shop, body) => {
      console.log(`Received webhook: ${topic} for shop: ${shop}`);
    },
  });
  res.redirect("/shopify/success");
};

const ShopifySucessController = async (req, res) => {
  res.send("Shopify app installed successfully");
};

const ShopifyUninstallController = async (req, res) => {
  const shop = req.get("X-Shopify-Shop-Domain");
  // remove shop token from db
  await Shop.update(
    {
      shopify_token: null,
    },
    {
      where: {
        shop_url: shop,
      },
    }
  );
  console.log(`Uninstall webhook received for ${shop}`);
  res.status(200).end("Webhook verified and processed successfully");
};

module.exports = {
  ShopifySucessController,
  ShopifyAuthController,
  ShopifyCallbackController,
  ShopifyUninstallController,
};
