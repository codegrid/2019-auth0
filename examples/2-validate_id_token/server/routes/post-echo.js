const router = require('express').Router();

router.post('/echo', (req, res, next) => {
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
