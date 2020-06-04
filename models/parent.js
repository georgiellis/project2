module.exports = function(sequelize, DataTypes) {
    var Parent = sequelize.define("Parent", {
      // The email cannot be null, and must be a proper email before creation
        parentId:{
          type: DataTypes.INTEGER,
          allowNull:false,
          autoIncrement:true,
          unique:true,
          primaryKey:true
        },/* 
        memId:{
          type: DataTypes.INTEGER,
          allowNull:false,
        }, */
        relationship: {
            type: DataTypes.STRING,
            default: 'Parent',
            allowNull:true 
        },
        createdAt: {
            allowNull: false,
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            allowNull: false,
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }

    });
    
    Parent.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Parent.hasMany(models.Passenger, {
        onDelete: "cascade"
      });
    };
    

    return Parent;
  };
  