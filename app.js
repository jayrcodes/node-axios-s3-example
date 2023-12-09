const express = require('express');
const cors = require('cors')
const app = express();
const Storage = require('./storage');

require('dotenv').config();
app.use(cors())

const storage = new Storage();
storage.folder = 'uploads';

app.get('/', (req, res) => {
  return res.json({
    message: 'working',
  });
});

app.post('/upload', function (req, res, next) {
  storage.upload(req, res, function (error) {
    if (error) {
      console.log(error);
      res.status(422);
      return res.json({
        message: 'Error uploading file.',
      });
    }

    console.log('File uploaded successfully.');
    return res.json({
      message: 'File uploaded successfully.',
    });
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
