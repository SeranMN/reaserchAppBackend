const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, requird: true },
    name: { type: String, requird: true },
    password: { type: String, requird: true }
});

const User = mongoose.model("user", UserSchema);
module.exports=User;