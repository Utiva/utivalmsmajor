'use strict';

module.exports = (sequelize, DataTypes) => {
  const ClassDays = sequelize.define('ClassDays', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    classId: DataTypes.UUID,
    date: DataTypes.DATE,
    courseId: DataTypes.UUID,
    time: DataTypes.TIME
  }, {});
  ClassDays.associate = () => {
    // associations can be defined here
  };
  return ClassDays;
};
