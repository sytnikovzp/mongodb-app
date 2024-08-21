const { Router } = require('express');

const playerRouter = require('./playersRouter');

const router = new Router();

router.use('/players', playerRouter);

module.exports = router;
