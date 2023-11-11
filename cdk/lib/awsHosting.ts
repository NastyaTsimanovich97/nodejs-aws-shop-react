import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as iam from '@aws-cdk/aws-iam';
import { Construct, Stack } from '@aws-cdk/core';

export class AwsHosting extends Construct {
  constructor(parent: Stack, name: string) {
    super(parent, name);

    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, "tsimanovich-task2-oai");

    const siteBucket = new s3.Bucket(this, 'tsimanovich-task2', {
      bucketName: 'tsimanovich-task-2',
      websiteIndexDocument: 'index.html',
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    siteBucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['S3:GetObject'],
      resources: [siteBucket.arnForObjects('*')],
      principals: [new iam.CanonicalUserPrincipal(cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
    }));

    const cloudFrontDistribution = new cloudfront.CloudFrontWebDistribution(this, "tsimanovich-task2-distribution", {
      originConfigs: [{
        s3OriginSource: {
          s3BucketSource: siteBucket,
          originAccessIdentity: cloudFrontOAI,
        },
        behaviors: [{
          isDefaultBehavior: true,
        }]
      }]
    });

    new s3deploy.BucketDeployment(this, 'tsimanovich-task-2-bucket-deployment', {
      sources: [s3deploy.Source.asset('../dist')],
      destinationBucket: siteBucket,
      distribution: cloudFrontDistribution,
      distributionPaths: ['/*'],
    });
  }
}