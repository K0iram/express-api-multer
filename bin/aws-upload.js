'use strict';

require('dotenv').load();

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fs = require('fs');

const mime = require('mime');
const path = require('path');
const crypto = require('crypto');

let file = {
  path: process.argv[2],
  title: process.argv[3]
};

let mimeType = mime.lookup(file.path);
let ext = path.extname(file.path);
let folder = (new Date()).toISOString().split('T')[0];

let stream = fs.createReadStream(file.path);

new Promise ((res, rej)=>{
  crypto.randomBytes(16, (err, buf)=>{
    if(err){
      rej(err);
    }
    else {
      console.log("buffer is ", buf);
      console.log("buffer.toS is ", buf.toString('hex'));

      res(buf.toString('hex'));
    }
  });
}).then((filename)=>{
  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${folder}/${filename}${ext}`,
    Body: stream,
    ContentType: mimeType
  };

  return new Promise((res, rej) =>{
    s3.upload(params, function (err, data){
      if(err){
        console.log(err);
        rej(err);
      }
      else {
        console.log(data);
        res(data);
      }
    });
  });
})
.then(console.log)
.catch(console.error);
