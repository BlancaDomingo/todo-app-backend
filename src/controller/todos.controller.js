import User from "../model/users.model.js";

export const getAllTodos = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).send("nicht gefunden:" + id);
  }
  res.json(user.todos);
};

export const addTodo = async (req, res) => {
  const { id } = req.params;

  const body = req.body;
  const text = body.text;
  const remember = body.remember;
  const repeat = body.email;
  const date = body.date;
  const done = false;

  const data = { text, remember, repeat, date, done };

  try {
    const userUpdated = await User.findById(id);
    await userUpdated.todos.push(data);
    const save = await userUpdated.save();
    res.status(200);
    res.json({ message: "success", data: save.todos });
  } catch (error) {
    console.log(error);
  }
};

/* export const updateTodo = async (req, res) => {
  const { idUser, idTodo } = req.params;

  User.findById(idUser, function (err, result) {
    if (!err) {
      if (!result) {
        res.status(404).send("User was not found");
      } else {
        result.todos.id(idTodo).done = req.body.done;

        result.markModified("todos");

        result.save(function (saveerr, saveresult) {
          if (!saveerr) {
            res.status(200).json(saveresult.todos);
          } else {
            res.status(400).send(saveerr.message);
          }
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });
}; */

export const updateTodo = async (req, res) => {
  const { idUser, idTodo } = req.params;

  User.findById(idUser, function (err, result) {
    if (!err) {
      if (!result) {
        res.status(404).send("User was not found");
      } else {
        const toggle = result.todos.id(idTodo).done
        result.todos.id(idTodo).done = !toggle;

        result.markModified("todos");

        result.save(function (saveerr, saveresult) {
          if (!saveerr) {
            res.status(200).json({message: 'success', data: saveresult.todos});
          } else {
            res.status(400).send(saveerr.message);
          }
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });
};

export const deleteTodo = async (req, res) => {
  const { idUser, idTodo } = req.params;

  User.findById(idUser, function (err, result) {
    if (!err) {
      if (!result) {
        res.status(404).send("User was not found");
      } else {
        result.todos.id(idTodo).remove(function (removeerr, removresult) {
          if (removeerr) {
            res.status(400).send(removeerr.message);
          }
        });
        result.markModified("todos");
        result.save(function (saveerr, saveresult) {
          if (!saveerr) {
            res.status(200).json({message: 'success', data: saveresult.todos});
          } else {
            res.status(400).send(saveerr.message);
          }
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });
};
