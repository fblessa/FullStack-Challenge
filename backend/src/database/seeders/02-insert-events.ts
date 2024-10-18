import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('Events', [
      {
        id: 1,
        name: 'BootCamp React',
        description: 'A maior feira de tecnologia do Brasil',
        date: new Date(),
        user_id: 2,
        location: 'Jeunesse Arena, Rio de Janeiro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Nuvem AWS',
        description: 'Description of event 2',
        date: new Date(),
        user_id: 2,
        location: 'Remoto - Online',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('Events', {});
  } 
}