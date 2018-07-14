module.exports = function(sequelize, DataType){
  const Blog = sequelize.define("Blog", {
    title: DataType.STRING,
    body: DataType.TEXT
  });

  Blog.associate = function(models){
    Blog.belongsTo(models.Author);
  };
  return Blog;
}
