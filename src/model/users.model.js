import mongoose from "mongoose";

const todosSchema = new mongoose.Schema({
  text: String,
  remember: Boolean,
  repeat: Boolean,
  date: String,
  done: Boolean
})

const usersSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  todos: [todosSchema]
},
  {
    timestamps: true,
    versionKey: false
  });

const usersModel = mongoose.model('Users', usersSchema, 'users');

export default usersModel;