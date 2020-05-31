
//-------------- Boiler plate ------------------
// // Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
// var bcrypt = require("bcryptjs");
// // Creating our User model
// module.exports = function(sequelize, DataTypes) {
//   var User = sequelize.define("User", {
//     // The email cannot be null, and must be a proper email before creation
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true
//       }
//     },
//     // The password cannot be null
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   });
//   // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
//   User.prototype.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
//   };
//   // Hooks are automatic methods that run during various phases of the User Model lifecycle
//   // In this case, before a User is created, we will automatically hash their password
//   User.addHook("beforeCreate", function(user) {
//     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
//   });
//   return User;
// };

// ------------ end of boiler plate ----------------------

// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model

module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define("Member", {
    // The email cannot be null, and must be a proper email before creation
    memId:{
        type: DataTypes.INTEGER,
        allowNull:false, // changed to true for testing
        autoIncrement:true,
        unique:true,
        primaryKey:true
    },
    mem_username: {
        type: DataTypes.STRING,
        allowNull:true, // changed to true for testing
    },
    memFirstname:{
        type: DataTypes.STRING,
        allowNull:true, // changed to true for testing
    }, 

    memLastname: {
        type: DataTypes.STRING,
        allowNull:true, // changed to true for testing
    }, 
    memEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    credits: {
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    memMobile:{
        type:DataTypes.STRING(16),
        defaultValue:'0061 000 000 000'
    },
    parentORguardian:{
      type:DataTypes.STRING,
      defaultValue:'parent'
    },
    relationship:{
      type:DataTypes.STRING,
      defaultValue:'mother'
    },
    createdAt: { // sequelize will create the createdAt and updatedAt field automatically
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
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Member.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Member.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  // Member.associate = function(models) {
  //   // Associating Author with Posts
  //   // When an Author is deleted, also delete any associated Posts
  //   Member.hasOne(models.Driver, {
  //     onDelete: "cascade"
  //   });
  //   Member.hasOne(models.Parent, {
  //     onDelete: "cascade"
  //   });
  //   Member.hasMany(models.Request,{
  //     onDelete: "cascade"
  // });
    
  // };


  return Member;
};