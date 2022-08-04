import { App } from 'aws-cdk-lib';
import { DatabaseStack } from './database-stack';
import { ApiStack } from './serverless-api-stack';

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

const dbStack = new DatabaseStack(app, 'example-serverless-db-stack', { env: devEnv });
const apiStack = new ApiStack(app, 'example-serverless-api-stack', { env: devEnv, vpc: dbStack.vpc });

apiStack.addDependency(dbStack);

app.synth();