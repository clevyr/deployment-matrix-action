# Deployment Matrix Action

This action outputs a matrix with deployment configuration depending on a configured branch mapping.

## Inputs

### `envs`

An object that maps each environment to a branch and/or a tag. Each key corresponds to an environment, with the value being either a string ([shorthand syntax](#shorthand-syntax)) or an object ([full syntax](#full-syntax)).

Default:
```yaml
prod: master
dev: dev
stage: stage
test: test
```

#### Shorthand Syntax

The shorthand syntax allows for a simple `key: value` configuration, where `key` corresponds to an environment, and `value` corresponds to a branch (or a branch pattern). The shorthand string will get converted into the standard syntax, and in the resulting matrix the environment will be accessible at `${{ matrix.env }}`.

#### Full Syntax

The full syntax allows for more configuration. `key` still corresponds to an environment, but the value is an object with any number of values.   
`branch` and `tag` are available as strings, patterns, or arrays of them.

Examples:
```yaml
prod:
  branch: master
  tag: v*
test:
  branch: test*
dev:
  branch: [dev, dev-*]
```

#### Custom Environment Name

To configure an explicit environment name, use the full syntax and set the name:

```yaml
demo:
  branch: demo
  name: Cool Name # If not specified, name would be computed as `Demo`
```

### `jobs`

List/CSV of jobs to run for each environment. Default: `app`

## Outputs

### `matrix`

JSON to be used for the matrix of a deployment action.   
`env` will be the environment, `name` will be computed (Unless configured in the full syntax), and any other values added on will be passed through.

Example:
```yaml
includes:
  - env: dev
    name: Development
```

## Example usage

```yaml
gen-deploy-matrix:
  name: Generate Deployment Matrix
  runs-on: ubuntu-latest
  outputs:
    matrix: ${{ steps.gen-deploy-matrix.outputs.matrix }}
  steps:
    - name: Generate Matrix
      uses: clevyr/deploy-matrix-action@v1
      id: gen-matrix
      with:
        map:
          prod: master
          dev: dev
          stage: stage
          test: test

build:
  name: Deploy ${{ matrix.name }}
  runs-on: ubuntu-latest
  needs: [gen-deploy-matrix]
  strategy:
    matrix: ${{ fromJson(needs.gen-deploy-matrix.outputs.matrix) }}
  steps:
    [...]
```
