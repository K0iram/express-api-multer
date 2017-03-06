'use strict';

require('dotenv').load();

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fs = require('fs');



let file = {
  path: process.argv[2],
  title: process.argv[3]
};

let stream = fs.createReadStream(file.path);

console.log("stream is " , stream);

let params = {
  ACL: 'public-read',
  Bucket: process.env.AWS_S3_BUCKET_NAME,
  Key: file.title,
  Body: stream
};

s3.upload(params, function (err, data){
  console.log(err, data);
});
