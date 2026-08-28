# syntax=docker/dockerfile:1
# check=skip=SecretsUsedInArgOrEnv
FROM ghcr.io/faraujo427/persistent-cache-mount:main

ARG CACHE_KEY=test-key

RUN echo == Generating test file == \
    && dd if=/dev/random of=cachefile bs=1M count=10

RUN --mount=type=secret,id=GITHUB_SERVER_URL,env=GITHUB_SERVER_URL \
    --mount=type=secret,id=ACTIONS_CACHE_URL,env=ACTIONS_CACHE_URL \
    --mount=type=secret,id=ACTIONS_CACHE_SERVICE_V2,env=ACTIONS_CACHE_SERVICE_V2 \
    --mount=type=secret,id=ACTIONS_RESULTS_URL,env=ACTIONS_RESULTS_URL \
    --mount=type=secret,id=ACTIONS_RUNTIME_TOKEN,env=ACTIONS_RUNTIME_TOKEN \
    echo == Test extraction == \
    && node /index.js extract --key ${CACHE_KEY} --paths /cachefile

RUN --mount=type=secret,id=GITHUB_SERVER_URL,env=GITHUB_SERVER_URL \
    --mount=type=secret,id=ACTIONS_CACHE_URL,env=ACTIONS_CACHE_URL \
    --mount=type=secret,id=ACTIONS_CACHE_SERVICE_V2,env=ACTIONS_CACHE_SERVICE_V2 \
    --mount=type=secret,id=ACTIONS_RESULTS_URL,env=ACTIONS_RESULTS_URL \
    --mount=type=secret,id=ACTIONS_RUNTIME_TOKEN,env=ACTIONS_RUNTIME_TOKEN \
    echo == Test injection with key == \
    && node /index.js inject --key ${CACHE_KEY} --paths /cachefile --lookup-only

RUN --mount=type=secret,id=GITHUB_SERVER_URL,env=GITHUB_SERVER_URL \
    --mount=type=secret,id=ACTIONS_CACHE_URL,env=ACTIONS_CACHE_URL \
    --mount=type=secret,id=ACTIONS_CACHE_SERVICE_V2,env=ACTIONS_CACHE_SERVICE_V2 \
    --mount=type=secret,id=ACTIONS_RESULTS_URL,env=ACTIONS_RESULTS_URL \
    --mount=type=secret,id=ACTIONS_RUNTIME_TOKEN,env=ACTIONS_RUNTIME_TOKEN \
    echo == Test injection with prefix key == \
    && node /index.js inject --key test-wrong-key --paths /cachefile --prefix-keys ${CACHE_KEY}- --lookup-only