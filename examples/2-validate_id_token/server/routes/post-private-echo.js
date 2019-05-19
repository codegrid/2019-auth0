const router = require('express').Router();

const checkIdToken = require('../middlewares/check-id-token');

router.post('/private/echo', checkIdToken, (req, res) => {
  const message = req.body.message;

  if (!message) {
    const inputError = new Error('Plese input some message.');
    inputError.status = 400;
    next(inputError);
    return;
  }

  res.json({
    message,
  });
});

module.exports = router;
