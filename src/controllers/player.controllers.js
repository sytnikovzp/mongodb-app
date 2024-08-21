const createError = require('http-errors');

const { Player } = require('../models');

class PlayerController {
  async getAllPlayers(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const players = await Player.find(
        {},
        {
          firstName: 1,
          lastName: 1,
          age: 1,
          rate: 1,
          'address.country': 1,
          _id: 0,
        }
      )
        .sort({
          lastName: 1,
        })
        .limit(limit)
        .skip(offset);
      if (players) {
        console.log(`Players are ${JSON.stringify(players, null, 2)}`);
        res.status(200).json(players);
      } else {
        console.log(`Any players have not been found!`);
        next(createError(404, `Any players have not been found!`));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
}

module.exports = new PlayerController();
