const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, "env"], // Ajoute le support des fichiers .env
};

module.exports = withNativeWind(config, { input: "./global.css" });
