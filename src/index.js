const core = require("@actions/core");
const github = require("@actions/github");
const yaml = require("js-yaml");
const { envName, matchPatterns, parseDynamicList } = require("./util");

try {
  const envs = yaml.load(core.getInput("envs"));
  const jobs = parseDynamicList(core.getInput("jobs"));
  const matrix = { include: [] };

  // Split GitHub ref into type (heads, tags) and ref
  const [, type, ref] = github.context.ref.match(/^refs\/(.+)\/(.+)$/);

  for (const [env, value] of Object.entries(envs)) {
    let patterns;
    let extraValues = {};

    if (typeof value === "string") {
      // Shorthand only matches branches
      if (type !== "heads") continue;
      patterns = value;
    } else {
      if (type === "heads") {
        // Ref is a branch
        patterns = value.branch;
      } else if (type === "tags") {
        // Ref is a tag
        patterns = value.tag;
      }

      extraValues = { ...value };
      delete extraValues.branch;
      delete extraValues.tag;
    }

    if (matchPatterns(ref, patterns)) {
      for (const job of jobs) {
        matrix.include.push({
          env,
          job,
          name: value.name || envName(env),
          ...extraValues,
        });
      }
    }
  }

  core.setOutput("matrix", matrix);
} catch (error) {
  core.setFailed(error.message);
}
