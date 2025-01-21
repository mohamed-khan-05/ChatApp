module.exports = (sequelize, DataTypes) => {
  const Chats = sequelize.define("Chats", {
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    SentTo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Chats.associate = (models) => {
    Chats.belongsTo(models.Users, {
      foreignKey: "UserEmail",
      targetKey: "email",
      onDelete: "CASCADE",
    });
  };
  return Chats;
};
