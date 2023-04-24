'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Hardnesses', [
      {
        name: 'Tender',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Medium-hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'Hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

    const tender = await queryInterface.rawSelect('Hardnesses', {
      where: {
        name: 'Tender'
      }
    }, ['id']);

    const medium = await queryInterface.rawSelect('Hardnesses', {
      where: {
        name: 'Medium-hard'
      }
    }, ['id']);

    const hard = await queryInterface.rawSelect('Hardnesses', {
      where: {
        name: 'Hard'
      }
    }, ['id']);

    await queryInterface.bulkInsert('Types', [
      {
        name: 'Softwood',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Exotic Wood',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Noble and Hardwoods',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    const softwood = await queryInterface.rawSelect('Types', {
      where: {
        name: 'Softwood'
      }
    }, ['id']);

    const exotic = await queryInterface.rawSelect('Types', {
      where: {
        name: 'Exotic Wood'
      }
    }, ['id']);

    const noble = await queryInterface.rawSelect('Types', {
      where: {
        name: 'Noble and Hardwoods'
      }
    }, ['id']);


    
    await queryInterface.bulkInsert('Woods', [
      {
        name: "Épicéa",
        type: softwood,
        hardness: tender,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Pin",
        type: softwood,
        hardness: medium,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Padouk",
        type: exotic,
        hardness: hard,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Érable",
        type: noble,
        hardness: medium,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Hêtre",
        type: noble,
        hardness: medium,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Itauba",
        type: exotic,
        hardness: hard,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Douglas",
        type: softwood,
        hardness: tender,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Types', null, {});
    await queryInterface.bulkDelete('Hardnesses', null, {});
    await queryInterface.bulkDelete('Woods', null, {});
  }
};
