const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const { Car } = require('../../models');

router.get('/', async (req, res, next) => {
  try {
    const cars = await Car.findAll();
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ wiadomosc: 'Wystąpił błąd podczas pobierania samochodów' });
  }
});

router.post('/', checkAuth, async (req, res, next) => {
  try {
    const newCar = await Car.create({
      marka: req.body.marka,
      model: req.body.model,
      rok: req.body.rok,
    });
    res.status(201).json(newCar);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ wiadomosc: 'Wystąpił błąd podczas dodawania samochodu' });
  }
});

router.get('/:carId', async (req, res, next) => {
  try {
    const car = await Car.findByPk(req.params.carId);
    if (!car) {
      res
        .status(404)
        .json({ wiadomosc: 'Nie znaleziono samochodu o podanym ID' });
    } else {
      res.status(200).json(car);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ wiadomosc: 'Wystąpił błąd podczas pobierania samochodu' });
  }
});

router.put('/:carId', checkAuth, async (req, res, next) => {
  try {
    const car = await Car.findByPk(req.params.carId);
    if (!car) {
      res
        .status(404)
        .json({ wiadomosc: 'Nie znaleziono samochodu o podanym ID' });
    } else {
      await car.update({
        marka: req.body.marka,
        model: req.body.model,
        rok: req.body.rok,
      });
      res.status(200).json(car);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ wiadomosc: 'Wystąpił błąd podczas aktualizacji samochodu' });
  }
});

router.delete('/:carId', checkAuth, async (req, res, next) => {
  try {
    const car = await Car.findByPk(req.params.carId);
    if (!car) {
      res
        .status(404)
        .json({ wiadomosc: 'Nie znaleziono samochodu o podanym ID' });
    } else {
      await car.destroy();
      res.status(200).json({ wiadomosc: 'Samochód usunięty pomyślnie' });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ wiadomosc: 'Wystąpił błąd podczas usuwania samochodu' });
  }
});

module.exports = router;
