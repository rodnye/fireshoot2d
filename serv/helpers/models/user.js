const UserModel = (DataTypes) => {
    return {
        user_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        google_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        facebook_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        acclevel: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    };
};

module.exports = UserModel;