# Deployment Matrix Action

This action outputs a matrix with deployment configuration depending on a configured branch mapping.

## Inputs

### `map`

An object that maps each branch to a given environment. Each key corresponds to a branch, with the value being either a string ([shorthand syntax](#shorthand-syntax)) or an object ([full syntax](#full-syntax)).

Default:
```yaml
master: prod
dev: dev
stage: stage
test: test
```

#### Shorthand Syntax

The shorthand syntax allows for a simple `key: value` configuration, where `key` corresponds to a branch, and `value` corresponds to an environment. The shorthand string will get converted into the standard syntax, and in the resulting matrix the environment will be accessible at `${{ matrix.env }}`.

#### Full Syntax

The full syntax allows for more configuration. `key` still corresponds to a branch, but the value is an object with any number of values.   
`env` is still required, `name` will be computed if it is not configured, then any other value will be passed through to the resulting matrix.

#### Custom Environment Name

To configure an explicit environment name, use the full syntax and set the name:

```yaml
demo:
  env: demo
  name: Cool Name # If not specified, name would be computed as `Demo`
```

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
          master: prod
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
