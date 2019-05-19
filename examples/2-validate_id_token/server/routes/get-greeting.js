const router = require('express').Router();

router.get('/greeting', (req, res) => {
  res.json({
    message: 'Hello!',
  });
});

module.exports = router;