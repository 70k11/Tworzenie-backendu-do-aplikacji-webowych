const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { User } = require('../../models');

router.post('/signup', async (req, res, next) => {
  try {
    const existingUser = await User.findOne({
      where: { username: req.body.username },
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ wiadomosc: 'Taki użytkownik już istnieje' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });

    res.status(201).json({ wiadomosc: 'Dodano użytkownika' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ wiadomosc: 'Wystąpił błąd podczas dodawania użytkownika' });
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
      return res.status(401).json({ wiadomosc: 'Błąd autoryzacji' });
    }

    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) {
      return res.status(401).json({ wiadomosc: 'Błąd autoryzacji' });
    }

    const token = jwt.sign({ wiadomosc: 'Ala ma kota' }, process.env.JWT_KEY, {
      expiresIn: '3h',
    });
    res.status(200).json({ token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ wiadomosc: 'Wystąpił błąd podczas logowania' });
  }
});

module.exports = router;
