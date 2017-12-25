const awsAccessKeyId = process.env.AWS_ACCESS_KEY;
const awsSecretAccessKey = process.env.AWS_SECRET_KEY;
const s3Bucket = process.env.S3_BUCKET;

module.exports = {
  awsAccessKeyId,
  awsSecretAccessKey,
  s3Bucket,
  urlBase: 's3.amazonaws.com',
};
