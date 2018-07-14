module.exports = function(sequelize, DataType){
  const Author = sequelize.define("Author", {
    external_id: DataType.STRING,
    nickname: DataType.STRING
  });

  Author.associate =function(models){
    Author.hasMany(models.Blog);
  };

  return Author;
}
