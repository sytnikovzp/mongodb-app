const createError = require('http-errors');

const { ObjectId } = require('mongodb');

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
        .sort({ lastName: 1 })
        .limit(limit)
        .skip(offset);
      if (players) {
        // console.log(`Players are: ${JSON.stringify(players, null, 2)}`);
        res.status(200).json(players);
      } else {
        console.log('Any players have not been found');
        next(createError(404, 'Any players have not been found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getPlayerById(req, res, next) {
    try {
      const { id } = req.params;
      const player = await Player.findById(
        id,
        'firstName lastName age rate address.country -_id'
      );
      if (player) {
        // console.log(`Player is: ${JSON.stringify(player, null, 2)}`);
        res.status(200).json(player);
      } else {
        console.log('Player has not been found');
        next(createError(404, 'Player has not been found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getVeterans(req, res, next) {
    try {
      const { age } = req.params;
      console.log(age);
      const veterans = await Player.find(
        {
          age: { $gte: age },
        },
        'firstName lastName age rate address.country -_id'
      );
      if (veterans.length > 0) {
        // console.log(`Players are: ${JSON.stringify(veterans, null, 2)}`);
        res.status(200).json(veterans);
      } else {
        console.log('Any players have not been found');
        next(createError(404, 'Any players have not been found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async addPlayer(req, res, next) {
    const { body } = req;
    try {
      const createdPlayer = new Player(body);
      const savedPlayer = await createdPlayer.save();
      if (savedPlayer) {
        console.log('Save successfuly');
        res.status(200).json(savedPlayer);
      } else {
        console.log('Can not create player');
        next(createError(404, 'Can not create player'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
  async patchPlayer(req, res, next) {
    try {
      const { body } = req;
      const { roleId, rate } = body;
      const updatedPlayers = await Player.updateMany(
        { rate: { $lte: rate } },
        { $set: { roleId: new ObjectId(roleId) } }
      );
      if (updatedPlayers.acknowledged) {
        console.log(
          `${updatedPlayers.modifiedCount} players have been modified`
        );
        res.status(200).json(updatedPlayers.modifiedCount);
      } else {
        console.log('Can not change players');
        next(createError(400, 'Can not change players'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  deletePlayer = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedPlayer = await Player.findByIdAndDelete(id);
      if (!deletedPlayer) {
        return next(createError(404, 'Player not found!'));
      }
      res.sendStatus(res.statusCode);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };
}

module.exports = new PlayerController();
