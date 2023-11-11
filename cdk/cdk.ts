import * as cdk from '@aws-cdk/core';
import { AwsHosting } from './lib/awsHosting';

class AwsHostingStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string) {
    super(parent, name);

    new AwsHosting(this, 'TsimanovichAWSRS');
  }
}

const app = new cdk.App();

new AwsHostingStack(app, 'TsimanovichAWSRS');

app.synth();

