import { Stack, StackProps } from 'aws-cdk-lib';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

interface ApiStackProps extends StackProps {
  vpc: ec2.IVpc;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const vpc = props.vpc;

    const expressFunction = new NodejsFunction(this, 'ExpressFunction', {
      entry: './src/functions/serverless-express.ts',
      runtime: lambda.Runtime.NODEJS_16_X,
      //environment: {
      //  DATABASE_HOST: proxy.endpoint,
      //},
      vpc,
    });

    const api = new apigw.RestApi(this, 'api', {
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        allowHeaders: apigw.Cors.DEFAULT_HEADERS,
      },
    });

    api.root.addProxy({
      defaultIntegration: new apigw.LambdaIntegration(expressFunction),
    });

  }
}
