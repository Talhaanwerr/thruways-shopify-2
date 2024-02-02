const axios = require("axios");

async function saveOrUpdateShop(shop, token, shopName) {
  try {
    const body = {
      source: "SHOPIFY",
      store_name: shopName,
      url: shop,
      domain_url: shop,
      status: "ACTIVE",
      api_token: token
    };

    const config = {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`
      }
    };

    const response = await axios.post(
      `${process.env.THRUWAYS_BACKEND_URL}/store`,
      body,
      config
    );
    console.log("store: ", response.data);
  } catch (error) {
    console.log("error: ", error);
  }
}

async function uninstall(shop) {
  try {
    const body = { url: shop };
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`
      }
    };

    const response = await axios.post(
      `${process.env.THRUWAYS_BACKEND_URL}/store/uninstall`,
      body,
      config
    );
    console.log("store: ", response.data);
  } catch (error) {
    console.log("error: ", error);
  }
}

module.exports = {
  saveOrUpdateShop,
  uninstall
};
