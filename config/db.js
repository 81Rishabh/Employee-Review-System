const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect(`mongodb+srv://Rishabh8109:1Rishu8109@er-cluster.hxdx5rg.mongodb.net/?retryWrites=true&w=majority`);

db.on('error' , function(err) {
   console.log("Error in conneting to mongodb");
});

db.once('open' , function() {
  console.log('Connected to mongodb.......✌️ ✌️ ✌️');
});