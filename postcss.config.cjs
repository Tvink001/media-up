// Autoprefixer runs over all CSS during the Vite/Astro build, adding vendor
// prefixes per the browserslist range in package.json. Manual -webkit- prefixes
// in components remain valid; autoprefixer is idempotent.
module.exports = {
  plugins: {
    autoprefixer: {},
  },
};
