# Build a Serverless API gateway with Node.js, TypeScript, SNS, Dynamodb etc

## Prerequisites

- AWS CLI installed and configured
- [`serverless-framework`](https://www.serverless.com/framework/)

## Installation

Run:

```bash
yarn
```

## Deployment

Run:

```bash
serverless deploy
```

## Endpoints

- POST /users - creates new user with auto-generated uuid
- GET /user/{email} - get user by email
