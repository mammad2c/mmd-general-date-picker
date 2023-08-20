module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `custom-code-quality-tools`
  extends: ["custom"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
