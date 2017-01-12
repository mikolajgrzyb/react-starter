console.log("Starting deploy");
let async = require('async'),
    fs = require('fs'),
    path = require("path"),
    env = require('node-env-file'),
    AWS = require('aws-sdk'),
    mime = require('mime-types'),
    S3 = require('aws-sdk/clients/s3');

env('./.env');

// Setup AWS S3 upload.

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

let s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {
    Bucket: process.env.BUCKET
  }
});
let cloudfront = new AWS.CloudFront();

// Setup AWS Cloudfront invalidation.
function invalidate() {
  console.log('INVALIDATING CLOUDFRONT DISTRIBUTION');
  let params = {
    DistributionId: process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID,
    InvalidationBatch: {
      CallerReference: String(+ new Date()),
      Paths: {
        Quantity: 1,
        Items: ['/index.html']
      }
    }
  };
  cloudfront.createInvalidation(params, function (err, results) {
    if (err) console.error("error", err);
    console.log("results", results);
  });
}
function cleanBucket() {
  console.log('DELETING DEPENDENCIES FROM S3 BUCKET');
  s3.listObjects({Bucket: process.env.BUCKET}, function (err, data) {
    if (err) console.log(err, err.stack);
    objectsToDelete = data.Contents
      .map(function(obj) { return {Key: obj.Key}; })
      .filter(function(obj){ return obj.Key != "index.html";});

    s3.deleteObjects({
      Bucket: process.env.BUCKET,
      Delete: {
        Objects: objectsToDelete
      }
    }, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     
        console.log(data);
        upload('./dist');
    });
  });
}
function upload(directory) {
  console.log('UPLOADING FILES TO S3 BUCKET');
  let directoryPath = path.resolve(directory);
  let paths = fs.readdirSync(directoryPath);
  async.map(paths, function (f, cb) {
      let filePath = path.join(directoryPath, f);
      if (fs.lstatSync(filePath).isDirectory()) {
        upload(directory + "/" + f);
      } else {
        let mimeType = mime.lookup(path.extname(filePath));
        let options = {
            Key: filePath.split('dist/')[1],
            Body: fs.readFileSync(filePath),
            ACL: 'public-read',
            ContentType: mimeType, 
            CacheControl: `max-age=${(process.env.AWS_CACHE_CONTROL || 60*60*2)}`
        };
        s3.putObject(options, cb);
      }
  }, function (err, results) {
      if (err) console.error("error", err);
      console.log("results", results);
      invalidate();
  });
};
cleanBucket();


