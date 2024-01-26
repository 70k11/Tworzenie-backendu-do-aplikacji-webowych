const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (err) {
    res.status(401).json({ wiadomosc: 'Błąd autoryzacji', error: err.message });
  }
};
