const minimatch = require("minimatch");
const defaultNames = require("./default_names");
const yaml = require("js-yaml");

/**
 * Convert a string to title case
 * @param {String} s
 * @return {String}
 */
const toTitleCase = (s) =>
  s.replace(
    /\w*s/g,
    (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()
  );

/**
 * Return a pretty environment name
 * @param {String} env
 * @return {String}
 */
const envName = (env) => defaultNames[env] || toTitleCase(env);

/**
 * Match a list of patterns against a value
 * @param {String} ref
 * @param {Array.<String>} patterns
 * @return {boolean}
 */
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

/**
 * Parse a YAML or a CSV into an array
 * @param {String} s
 * @return {*}
 */
const parseDynamicList = (s) => {
  s = yaml.load(s);
  if (typeof s === "string") {
    return s.split(/[,|;\n]/);
  }
  return s;
};

module.exports = {
  toTitleCase,
  envName,
  matchPatterns,
  parseDynamicList,
};
