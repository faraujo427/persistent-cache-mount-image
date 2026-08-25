# Github cache in container

parameters:

- inject: Downloads the cache to the container
- extract: Uploads from container to the cache
- key: The key used to lookup the cache
- prefix-keys: Alternative prefixes used to lookup the cache
- path: The path that the cache should operate upon
- lookup-only: Only validates that the cache exists

required environment variables:

- GITHUB_SERVER_URL
- ACTIONS_CACHE_URL
- ACTIONS_RESULTS_URL
- ACTIONS_RUNTIME_TOKEN

optional environment variables:

- ACTIONS_CACHE_SERVICE_V2

These are available in an action environment, but are absent if you use inside `run` in a step. They can be exported using `actions/github-script`

```
core.exportVariable('ACTIONS_CACHE_URL', process.env['ACTIONS_CACHE_URL'])
```
 
 **Important!**

The `action/cache` library will print logs to stdout and some may have sensitive information. Filter or disable the build logs entirely.