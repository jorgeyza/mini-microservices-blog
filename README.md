# Microservices blog

This is a small project that demonstrates the concepts of a microservices architecture.

## How to use?

Run the following command:

```sh
pnpm install && pnpm dev
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `client`: a [Next.js](https://nextjs.org/) blog app
- `posts`: a [Fastify](https://www.fastify.io/) server for the posts service
- `comments`: another [Fastify](https://www.fastify.io/) server for the comments service
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
