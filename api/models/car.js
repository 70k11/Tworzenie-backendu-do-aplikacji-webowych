const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Car = sequelize.define('Car', {
    marka: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rok: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Car;
};
