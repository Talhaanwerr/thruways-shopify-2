const express = require('express');
const router = express.Router();
const { ShopifySucessController, ShopifyAuthController, ShopifyCallbackController, ShopifyUninstallController } = require("../controllers/ShopifyController");

router.get("/", ShopifyAuthController);
router.get("/callback", ShopifyCallbackController);
router.post("/webhooks/app/uninstalled", ShopifyUninstallController);

router.get("/success", ShopifySucessController);

module.exports = router;