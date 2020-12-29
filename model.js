import { Sequelize, Model, DataTypes } from "sequelize";
import { user, password, host, database } from "./database.js";
import bcrypt from "bcrypt";

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: "postgres",
  logging: false,
});

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    session_token: {
      type: DataTypes.STRING,
    },
    session_expiration: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        // @ts-ignore
        User.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

User.prototype.isPasswordValid = async function (password) {
  // @ts-ignore
  return await bcrypt.compare(password, this.password);
};

// @ts-ignore
class House extends Sequelize.Model {}

// @ts-ignore
House.init(
  {
    id: {
      // @ts-ignore
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // @ts-ignore
    picture: { type: Sequelize.DataTypes.STRING, allowNull: false },
    // @ts-ignore
    type: { type: Sequelize.DataTypes.STRING, allowNull: false },
    // @ts-ignore
    town: { type: Sequelize.DataTypes.STRING, allowNull: false },
    // @ts-ignore
    title: { type: Sequelize.DataTypes.STRING, allowNull: false },
    // @ts-ignore
    price: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
    // @ts-ignore
    owner: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "house",
    timestamps: false,
  }
);

// @ts-ignore
class Booking extends Sequelize.Model {}

// @ts-ignore
Booking.init(
  {
    id: {
      // @ts-ignore
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // @ts-ignore
    houseId: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
    // @ts-ignore
    userId: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
    // @ts-ignore
    startDate: { type: Sequelize.DataTypes.DATEONLY, allowNull: false },
    // @ts-ignore
    endDate: { type: Sequelize.DataTypes.DATEONLY, allowNull: false },
    paid: {
      // @ts-ignore
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    // @ts-ignore
    sessionId: { type: Sequelize.DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "booking",
    timestamps: true,
  }
);
User.sync({ alter: true });
// @ts-ignore
House.sync({ alter: true });

// @ts-ignore
Booking.sync({ alter: true });

export { sequelize, User, House, Booking };
