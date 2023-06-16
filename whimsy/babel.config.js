module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Add any other Babel plugins or configuration here, if needed
  };
};

