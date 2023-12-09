const express = require('express');
const cors = require('cors')
const app = express();
const { upload } = require('./storage');

require('dotenv').config();
app.use(cors())

app.get('/', (req, res) => {
  return res.json({
    message: 'working',
  });
});

app.post('/upload', function (req, res, next) {
  upload(req, res, function (error) {
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
