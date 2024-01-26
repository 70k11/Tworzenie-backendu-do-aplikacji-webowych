require('dotenv').config();

const express = require('express');
const app = express();

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Połączenie z bazą danych ustanowione.');
  })
  .catch((err) => {
    console.error('Błąd połączenia z bazą danych:', err);
  });

const morgan = require('morgan');
app.use(morgan('combined'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const carRoutes = require('./api/routes/cars')(sequelize);
const userRoutes = require('./api/routes/users')(sequelize);

app.use('/cars', carRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
  res.status(404).json({ wiadomosc: 'Nie odnaleziono' });
});

module.exports = app;
