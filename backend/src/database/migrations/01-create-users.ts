import { QueryInterface, Model, DataTypes } from 'sequelize'
import { UserDB } from '../../interfaces/Database'

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<UserDB>>('Users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      confirmEmailToken: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'confirm_email_token'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    })
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('Users')
  }
}