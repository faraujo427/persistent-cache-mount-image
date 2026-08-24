# Github cache in container

parameters:

- inject: Downloads the cache to the container
- extract: Uploads from container to the cache
- key: The key used to lookup the cache
- prefix-keys: Alternative prefixes used to lookup the cache
- path: The path that the cache should operate upon
- lookup-only: Only validates that the cache exists

required environment variables:

- 
