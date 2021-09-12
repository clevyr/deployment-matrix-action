const minimatch = require("minimatch");
const defaultNames = require("./default_names");

const toTitleCase = (str) =>
  str.replace(
    /\w*s/g,
    (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()
  );

const envName = (env) => defaultNames[env] || toTitleCase(env);

const matchPatterns = (ref, patterns) => {
  if (patterns === undefined) return false;
  // Convert to array if string given
  patterns = [].concat(patterns);
  for (const pattern of patterns) {
    if (minimatch(ref, pattern)) {
      return true;
    }
  }
  return false;
};

module.exports = {
  toTitleCase,
  envName,
  matchPatterns,
};
