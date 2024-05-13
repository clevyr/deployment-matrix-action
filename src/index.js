import * as core from "@actions/core";
import * as github from "@actions/github";
import yaml from "js-yaml";
import { envName, matchPatterns, parseDynamicList } from "./util.js";

try {
  const envs = yaml.load(core.getInput("envs"));
  const jobs = parseDynamicList(core.getInput("jobs"));
  const matrix = { include: [] };

  // Split GitHub ref into type (heads, tags) and ref
  const [, type, ref] = github.context.ref.match(/^refs\/(.+)\/(.+)$/);

  let count = 0;
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
        count += 1;
        matrix.include.push({
          name: value.name || envName(env),
          env,
          job,
          ...extraValues,
        });
      }
    }
  }
  core.startGroup("Generated matrix");
  core.info(`Matched ${count} envs`);
  core.info(yaml.dump(matrix));
  core.endGroup();

  core.setOutput("count", count);
  core.setOutput("matrix", matrix);
} catch (error) {
  core.setFailed(error.message);
}
