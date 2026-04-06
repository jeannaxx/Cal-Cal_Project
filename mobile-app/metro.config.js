const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// ตรวจสอบชื่อไฟล์ในเครื่องคุณด้วยนะว่าสะกด global.css หรือเปล่า
module.exports = withNativeWind(config, { input: './app/global.css' });