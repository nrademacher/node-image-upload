const router = require('express').Router(),
  errorRoutes = require('./errorRoutes'),
  imageRoutes = require('./imageRoutes');

router
  .get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Image Uploader</title>
        <meta charset="utf-8" />
      </head>
      <body>
        <h1>Upload to gallery</h1>
        <form action="https://dry-shore-64957.herokuapp.com/images/postImages" method="post" enctype="multipart/form-data">
          <input type="text" placeholder="Album" name="album" required />
          <br />
          <br />
          <input type="text" placeholder="Title" name="title" required />
          <br />
          <br />
          <input type="text" placeholder="Location (optional)" name="location" />
          <br />
          <br />
          <input type="file" accept="image/*" name="photo" required />
          <br />
          <br />
          <input type="password" placeholder="Password" name="password" required />
          <br />
          <br />
          <input type="submit" value="Upload" />
        </form>
      </body>
    </html>
    `);
  })
  .get('/server', (req, res) => {
    res.send('Image upload server online');
  })
  .use('/images', imageRoutes)
  .use(errorRoutes);

module.exports = router;
