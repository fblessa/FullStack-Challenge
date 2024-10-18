import { DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from './index';
import UsersSequelize from './Users.model';

class EventsSequelize extends Model<InferAttributes<EventsSequelize>,
InferCreationAttributes<EventsSequelize>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare date: Date;
  declare userId: CreationOptional<number>;
  declare location: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

EventsSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize: db,
  modelName: 'Events',
  timestamps: false,
});

UsersSequelize.hasMany(EventsSequelize, {
  foreignKey: 'userId',
  sourceKey: 'id',
});

EventsSequelize.belongsTo(UsersSequelize, {
  foreignKey: 'userId',
  targetKey: 'id',
});

export default EventsSequelize;