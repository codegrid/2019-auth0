const router = require('express').Router();

const checkIdToken = require('../middlewares/check-id-token');

router.get('/private/greeting', checkIdToken, (req, res) => {
  res.json({
    message: `Hello, ${req.user.nickname}!`,
  });
});

module.exports = router;