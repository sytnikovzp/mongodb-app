require('dotenv').config();
const express = require('express');

const dbMongo = require('./src/models');
const { players, roles } = require('./src/constants');
const router = require('./src/routers');

const { Player, Role } = dbMongo;

const app = express();

app.use(express.json());

app.use('/api', router);

const createPlayers = async () => {
  await Player.create(players);
};

// createPlayers()

const createRoles = async () => {
  await Role.create(roles);
};

// createRoles()

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
