module.exports = {
  "src/*.js": [
    "eslint --fix",
    "prettier --write",
    () => "npm run build",
    () => "git add :/dist",
  ],
};
