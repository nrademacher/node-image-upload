const router = require('express').Router(),
  errorRoutes = require('./errorRoutes'),
  imageRoutes = require('./imageRoutes');

router
  .get('/', (req, res) => {
    res.send(`
      Image upload online
    `);
  })
  .get('/server', (req, res) => {
    res.send('Image upload server online');
  })
  .use('/images', imageRoutes)
  .use(errorRoutes);

module.exports = router;
