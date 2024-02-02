const { fileURLToPath } = require('url')
const { dirname } = require('path')

module.exports = function fileName(metaUrl) {
  const __filename = fileURLToPath(metaUrl);
  const __dirname = dirname(__filename);
  return { __filename, __dirname };
}