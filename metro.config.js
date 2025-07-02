const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // adicionar esta linha para reanimated
  config.resolver.sourceExts.push('cjs');

  return config;
})();
