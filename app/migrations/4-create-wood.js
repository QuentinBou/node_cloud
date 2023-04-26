'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Woods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      typeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hardnessId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('Woods', {
      fields: ['typeId'],
      type: 'foreign key',
      name: 'fk_wood_type',
      references: {
        table: 'Types',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('Woods', {
      fields: ['hardnessId'],
      type: 'foreign key',
      name: 'fk_wood_hardness',
      references: {
        table: 'Hardnesses',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Woods');
  },
};
