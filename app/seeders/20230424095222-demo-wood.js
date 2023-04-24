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
        typeId: softwood,
        hardnessId: tender,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Pin",
        typeId: softwood,
        hardnessId: medium,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Padouk",
        typeId: exotic,
        hardnessId: hard,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Érable",
        typeId: noble,
        hardnessId: medium,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Hêtre",
        typeId: noble,
        hardnessId: medium,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Itauba",
        typeId: exotic,
        hardnessId: hard,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Douglas",
        typeId: softwood,
        hardnessId: tender,
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
