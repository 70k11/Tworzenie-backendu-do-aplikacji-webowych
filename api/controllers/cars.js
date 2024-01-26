const { Car } = require('../models');

exports.cars_get_all = async (req, res, next) => {
  try {
    const cars = await Car.findAll();
    res.status(200).json({
      wiadomosc: 'Lista wszystkich samochodów',
      info: cars,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.cars_add_new = async (req, res, next) => {
  try {
    const newCar = await Car.create({
      marka: req.body.marka,
      model: req.body.model,
      rok: req.body.rok,
    });
    res.status(201).json({
      wiadomosc: 'Dodanie nowego samochodu',
      info: newCar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.cars_get_by_id = async (req, res, next) => {
  const id = req.params.carId;
  try {
    const car = await Car.findByPk(id);
    if (!car) {
      res
        .status(404)
        .json({ wiadomosc: 'Nie znaleziono samochodu o numerze ' + id });
    } else {
      res.status(200).json({
        wiadomosc: 'Szczegóły samochodu o numerze ' + id,
        info: car,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.car_change = async (req, res, next) => {
  const id = req.params.carId;

  try {
    const car = await Car.findByPk(id);
    if (!car) {
      res
        .status(404)
        .json({ wiadomosc: 'Nie znaleziono samochodu o numerze ' + id });
    } else {
      await car.update({
        marka: req.body.marka,
        model: req.body.model,
        rok: req.body.rok,
      });
      res
        .status(200)
        .json({ wiadomosc: 'Zmieniono dane samochodu o numerze ' + id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.cars_delete = async (req, res, next) => {
  const id = req.params.carId;

  try {
    const car = await Car.findByPk(id);
    if (!car) {
      res
        .status(404)
        .json({ wiadomosc: 'Nie znaleziono samochodu o numerze ' + id });
    } else {
      await car.destroy();
      res.status(200).json({ wiadomosc: 'Usunięto samochód o numerze ' + id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
