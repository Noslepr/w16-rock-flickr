'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'fake1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('fakepass1'),
      },
      {
        email: 'fake2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('fakepass2'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {})
  }
};
