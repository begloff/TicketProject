const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.hasMany(models.Booking, {
        foreignKey: "eventId",
        as: "bookings",
      });
    }

    //Fetch any bookings with matching fk
    static loadScopes() {
      Event.addScope("bookings", { include: ["bookings"] });
    }
  }

  Event.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      maxCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
