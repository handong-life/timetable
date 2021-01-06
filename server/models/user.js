const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: DataTypes.TEXT,
      },
      {
        tableName: 'User',
        modelName: 'user',
        sequelize,
      },
    );
  }
  static associate(models) {
    this.belongsToMany(models.lecture, { through: 'userLectureRelation' });
    this.hasMany(models.timetable, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
  }
}

module.exports = User;
