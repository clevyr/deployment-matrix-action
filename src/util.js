const defaultNames = require('./default_names');

const toTitleCase = (str) => str.replace(
    /\w*/g,
    (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(),
);

const formatJobSpec = (jobSpec) => {
  // Set value.env if input has shorthand
  if (typeof value === 'string') {
    jobSpec = {'env': value};
  }
  // Compute name if not specified
  if (!value.name) {
    jobSpec.name = defaultNames[value.env] || toTitleCase(value.env);
  }
  return jobSpec;
};

exports = {
  toTitleCase,
  formatJobSpec,
};
