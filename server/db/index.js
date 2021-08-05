//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')

//TODO move to own file!!
const Image = db.define('image', {
  data: {
    type: db.Sequelize.DataTypes.TEXT
  }

});

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Image
  },
}
