# Example for Lambda with Aurora PostgreSQL

## How to use

### 1. Configure AWS SSO and login

```bash
aws configure sso --profile default

aws sso login
```

### 2. Deploy CDK app

```bash
yarn install

cdk deploy --all
````
