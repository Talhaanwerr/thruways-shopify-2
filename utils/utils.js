const fs = require('fs');

// Function to save objects to files
function saveObjectsToFile(filename, data) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filename, jsonData);
  console.log(`Object saved to ${filename}.`);
}

// Function to read objects from files
function getObjectsFromFile(filename) {
  try {
    const jsonData = fs.readFileSync(filename, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error.message);
    return null;
  }
}

function getShopByShopUrl(filename, targetShopUrl) {
  const allShops = getObjectsFromFile(filename);
  if (allShops) {
    return allShops.find(shop => shop.shop_url === targetShopUrl) || null;
  }
  return null;
}

// Function to update shop by name
function updateShopByUrl(filename, targetShopUrl, updatedShopData) {
  const allShops = getObjectsFromFile(filename);
  if (allShops) {
    const updatedShops = allShops.map(shop => (shop.shop_url === targetShopUrl ? updatedShopData : shop));
    saveObjectsToFile(filename, updatedShops);
    console.log('Shop updated successfully.');
  } else {
    console.error('Could not update shop - file not found or invalid JSON.');
  }
}

module.exports = {
    saveObjectsToFile,
    getObjectsFromFile,
    getShopByShopUrl,
    updateShopByUrl
}

