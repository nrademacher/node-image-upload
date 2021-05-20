const router = require('express').Router(),
  errorRoutes = require('./errorRoutes'),
  imageRoutes = require('./imageRoutes');

router
  .get('/server', (req, res) => {
    res.send('Server seems to be working');
  })
  .use('/images', imageRoutes)
  .use(errorRoutes);

module.exports = router;
