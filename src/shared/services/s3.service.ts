import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async uploadFile(file: Buffer, fileKey) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
    };

    try {
      await this.s3.upload(params).promise();
      console.log(
        `File uploaded successfully to ${params.Bucket}/${params.Key}`,
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public generatePresignedUrl(objectKey: string) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: objectKey,
      Expires: 60,
    };

    return this.s3.getSignedUrl('getObject', params);
  }
}
