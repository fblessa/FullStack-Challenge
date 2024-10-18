import { QueryInterface } from 'sequelize';
import bcrypt from 'bcryptjs';
import { createEmailToken } from '../../utils/jwt';

const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

export default {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Users', [
    {
      id: 1,
      name: 'admin',
      email: ADMIN_EMAIL,
      password: bcrypt.hashSync(ADMIN_PASSWORD, SALT_ROUNDS),
      confirm_email_token: createEmailToken({ email: ADMIN_EMAIL }),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'user',
      email: 'fbdonada@gmail.com',
      password: bcrypt.hashSync('12345678', SALT_ROUNDS),
      confirm_email_token: createEmailToken({ email: 'fbdonada@gmail.com' }),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },
  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Users', {})
  }
}