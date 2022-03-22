import User from '../model/users.model.js';


export const getAllTodos = async (req, res) => {

    const { id } = req.params;
    const user = await User.findById(id)
    if (!user) {
        return res.status(400).send('nicht gefunden:' + id)
    }
    res.json(user.todos);

      
}


export const addTodo = async (req, res) => {

   
}

export const updateTodo = async (req, res) => {

}

export const deleteTodo = async (req, res) => {

}

