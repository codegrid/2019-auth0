const router = require('express').Router();

const getGreeting = require('./get-greeting');
const getPrivateGreeting = require('./get-private-greeting');
const postEcho = require('./post-echo');
const postPrivateEcho = require('./post-private-echo');

router.use(getGreeting);
router.use(getPrivateGreeting);
router.use(postEcho);
router.use(postPrivateEcho);

module.exports = router;