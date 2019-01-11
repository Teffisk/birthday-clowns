'use strict';
var bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email format.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 20],
          msg: 'Password must be between 8 and 20 characters in length.'
        }
      }
    },
    username: DataTypes.STRING,
    dob: DataTypes.DATE,
    bio: DataTypes.TEXT,
    admin: DataTypes.BOOLEAN,
    image: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: {
          msg: 'Invalid image URL.'
        }
      }
    }
  }, {
    //Hooks go here
    hooks: {
     beforeCreate: function(pendingUser){
       if(pendingUser){
         var hash = bcrypt.hashSync(pendingUser.password, 12);
         pendingUser.password = hash;
        }
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  user.prototype.validPassword = function(typedPassword){
    return bcrypt.compareSync(typedPassword, this.password);
  }
  return user;
};








