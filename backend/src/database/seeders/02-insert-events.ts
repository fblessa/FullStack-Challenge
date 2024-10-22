import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('Events', [
      {
        id: 1,
        name: 'BootCamp React',
        description: 'A maior feira de tecnologia do Brasil',
        date: '10 de novembro de 2024',
        location: 'Jeunesse Arena, Rio de Janeiro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Nuvem AWS',
        description: 'Description of event 2',
        date: '11 de novembro de 2024',
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