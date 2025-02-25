import { minimatch } from "minimatch";
import defaultNames from "./default_names.js";
import yaml from "js-yaml";

/**
 * Convert a string to title case
 * @param {String} s
 * @return {String}
 */
export const toTitleCase = (s) =>
  s.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substring(1));

/**
 * Return a pretty environment name
 * @param {String} env
 * @return {String}
 */
export const envName = (env) => defaultNames[env] || toTitleCase(env);

/**
 * Match a list of patterns against a value
 * @param {String} ref
 * @param {Array.<String>} patterns
 * @return {boolean}
 */
export const matchPatterns = (ref, patterns) => {
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
export const parseDynamicList = (s) => {
  const parsed = yaml.load(s);
  if (typeof parsed === "string") {
    return s.split(/[,|;\n]/);
  }
  return parsed;
};
