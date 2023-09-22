const EquipmentModel = (DataTypes) => {
    return {
        user_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        head: {
            type: DataTypes.STRING,
            allowNull: true
        },
        body: {
            type: DataTypes.STRING,
            allowNull: true
        },
        feet: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pweapon: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sweapon: {
            type: DataTypes.STRING,
            allowNull: true
        }
    };
};

module.exports = EquipmentModel;