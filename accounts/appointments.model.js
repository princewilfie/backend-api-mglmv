const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        date: { type: DataTypes.DATE, allowNull: false },
        reason: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        timestamps: true // This will add createdAt and updatedAt fields
    };

    return sequelize.define('Appointment', attributes, options);
}
