const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
        feedback: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        timestamps: true // This will add createdAt and updatedAt fields
    };

    return sequelize.define('Review', attributes, options);
}
