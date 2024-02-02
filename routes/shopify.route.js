const express = require('express');
const router = express.Router();
const { ShopifyAuthController, ShopifyCallbackController, ShopifyUninstallController } = require("../controllers/ShopifyController");

router.get("/", ShopifyAuthController);
router.get("/callback", ShopifyCallbackController);
router.post("/webhooks/app/uninstalled", ShopifyUninstallController);

router.get("/success", (req, res) => {
    res.send("App installed successfully!");
});

module.exports = router;