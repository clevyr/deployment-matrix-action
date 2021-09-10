const core = require('@actions/core');
const github = require('@actions/github');
const yaml = require('js-yaml');
const {formatJobSpec} = require('./util');

try {
  const branchEnvMap = yaml.load(core.getInput('map'));
  const matrix = {'include': []};

  const branch = github.context.ref.replace('refs/heads/', '');

  if (branchEnvMap.hasOwnProperty(branch)) {
    matrix.include.push(formatJobSpec(branchEnvMap[branch]));
  }

  core.setOutput('matrix', matrix);
} catch (error) {
  core.setFailed(error.message);
}
