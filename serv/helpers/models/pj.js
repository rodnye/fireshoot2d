const PjModel = (DataTypes) => {
    return {
        user_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        x: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        y: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        a: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        m: {
            type: DataTypes.STRING,
            default: "m_1",
            allowNull: false
        },
    };
};

module.exports = PjModel;