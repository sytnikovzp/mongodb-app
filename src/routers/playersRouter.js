const { Router } = require('express');

const PlayerController = require('../controllers/player.controllers');

const {
  paginate: { paginate },
} = require('../middlewares');

const playerRouter = new Router();

playerRouter
  .route('/')
  .get(paginate, PlayerController.getAllPlayers)
  .post(PlayerController.addPlayer);

playerRouter.route('/age/:age').get(PlayerController.getVeterans);

playerRouter.route('/roles').patch(PlayerController.patchPlayer);

playerRouter
  .route('/:id')
  .get(PlayerController.getPlayerById)
  .delete(PlayerController.deletePlayer);

module.exports = playerRouter;
