FROM ghcr.io/faraujo427/persistent-cache-mount:main

RUN node /index.js extract --key test-key --paths /node_modules

RUN node /index.js inject --key test-key --paths /node_modules --lookup-only