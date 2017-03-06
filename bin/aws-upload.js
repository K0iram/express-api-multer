'use strict';

require('dotenv').load();

const s3Upload = require('../lib/s3-upload.js');

let file = {
  path: process.argv[2],
  title: process.argv[3]
};

s3Upload(file)
  .then(console.log)
  .catch(console.error);
