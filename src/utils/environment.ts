export function checkEnvironment() {
  if (
    process.env['GITHUB_SERVER_URL'] == undefined ||
    process.env['GITHUB_SERVER_URL'] == ''
  ) {
    throw new Error("The environment variable 'GITHUB_SERVER_URL' must be set!")
  }

  if (
    process.env['ACTIONS_CACHE_URL'] == undefined ||
    process.env['ACTIONS_CACHE_URL'] == ''
  ) {
    throw new Error("The environment variable 'ACTIONS_CACHE_URL' must be set!")
  }

  if (
    process.env['ACTIONS_RESULTS_URL'] == undefined ||
    process.env['ACTIONS_RESULTS_URL'] == ''
  ) {
    throw new Error(
      "The environment variable 'ACTIONS_RESULTS_URL' must be set!"
    )
  }

  if (
    process.env['ACTIONS_RUNTIME_TOKEN'] == undefined ||
    process.env['ACTIONS_RUNTIME_TOKEN'] == ''
  ) {
    throw new Error(
      "The environment variable 'ACTIONS_RUNTIME_TOKEN' must be set!"
    )
  }
}
