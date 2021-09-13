module.exports = {
  "src/*.js": [
    "eslint --fix",
    "prettier --write",

    // Build staged changes
    () => "git stash push --keep-index --include-untracked :/src",
    () => "npm run build",
    () => "git add :/dist",
    () => "git stash drop",
  ],
};
