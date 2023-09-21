const EquipmentModel = (DataTypes) => {
    return {
        user_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        head: {
            type: DataTypes.String,
            allowNull: true
        },
        body: {
            type: DataTypes.String,
            allowNull: true
        },
        feet: {
            type: DataTypes.String,
            allowNull: true
        },
        pweapon: {
            type: DataTypes.String,
            allowNull: true
        },
        sweapon: {
            type: DataTypes.String,
            allowNull: true
        }
    };
};

module.exports = EquipmentModel;