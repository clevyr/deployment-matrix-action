export default {
  "src/*.js": [
    "eslint --fix",
    () => "npm run test",
    () => "npm run build",
    () => "git add :/dist",
  ],
  "__test__/*.js": ["eslint --fix", () => "npm run test"],
};
