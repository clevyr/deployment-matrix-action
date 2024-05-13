module.exports = {
  "src/*.js": ["eslint --fix", () => "npm run build", () => "git add :/dist"],
};
