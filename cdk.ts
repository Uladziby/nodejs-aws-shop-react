/** @format */

import * as cdk from "aws-cdk-lib/core";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as deployment from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import dotenv from "dotenv";

dotenv.config();

const app = new cdk.App();

const stack = new cdk.Stack(app, "ShopReactCloudFrontStack", { env: { region: "eu-west-1" } });

const bucket = new s3.Bucket(stack, "ShopReactBucket", { bucketName: "rs-aws-course-app" });

const originAccessIdentity = new cloudfront.OriginAccessIdentity(stack, "WebAppBucketOAI", {
	comment: bucket.bucketName,
});

bucket.grantRead(originAccessIdentity);

const cloudfrontDistribution = new cloudfront.Distribution(stack, "WebAppDistribution", {
	defaultBehavior: { origin: new origins.S3Origin(bucket, { originAccessIdentity }) },

	defaultRootObject: "index.html",
	errorResponses: [{ httpStatus: 404, responseHttpStatus: 200, responsePagePath: "/index.html" }],
});

new deployment.BucketDeployment(stack, "DeployWebApp", {
	destinationBucket: bucket,
	sources: [deployment.Source.asset("./dist")],
	distribution: cloudfrontDistribution,
	distributionPaths: ["/*"],
});

new cdk.CfnOutput(stack, "Domain URL", {
	value: cloudfrontDistribution.distributionDomainName,
});
/* const stack = new MyStaticSiteStack(app, "ImportServiceStack");

export class StaticSite extends Construct {
	constructor(parent: Stack, name: string) {
		super(parent, name);

		const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, "JSCC-OAI");

		const siteBucket = new s3.Bucket(this, "WebAppBucket", {
			bucketName: "rs-aws-shop-react-bucket",
			websiteIndexDocument: "index.html",
			publicReadAccess: false,
			blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
		});

		siteBucket.addToResourcePolicy(
			new iam.PolicyStatement({
				actions: ["s3:GetObject"],
				resources: [siteBucket.arnForObjects("*")],
				principals: [
					new iam.CanonicalUserPrincipal(
						cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
					),
				],
			})
		);

		const distribution = new cloudfront.Distribution(this, "WebAppDistribution", {
			originConfigs: [
				{
					s3OriginSource: {
						s3BucketSource: siteBucket,
						originAccessIdentity: cloudfrontOAI,
					},
					behaviors: [{ isDefaultBehavior: true }],
				},
			],
			errorResponses: [
				{
					httpStatus: 404,
					responseHttpStatus: 200,
					responsePagePath: "/index.html",
				},
			],
		});

		new s3deploy.BucketDeployment(this, "DeployWebApp", {
			sources: [s3deploy.Source.asset("./dist")],
			destinationBucket: siteBucket,
			distribution,
			distributionPaths: ["/*"],
		});
	}
}

class MyStaticSiteStack extends cdk.Stack {
	constructor(parent: cdk.App, name: string) {
		super(parent, name);

		new StaticSite(this, "JSCCStaticWebsite");
	}
}

app.synth();
 */
