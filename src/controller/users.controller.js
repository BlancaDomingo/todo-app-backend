
import User from '../model/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'



export const getUser = async (req, res) => {

    const { id } = req.params;
    const user = await User.findById(id)
    if (!user) {
        return res.status(400).send('nicht gefunden:' + id)
    }
    res.json(user);
}


export const getAllUsers = async (req, res) => {

    const users = await User.find()
    res.status(200)
    res.json(users);
}

export const updateUser = async (req, res) => {

    try {
        const id = req.params.id;
        console.log(typeof req.body);

        const userUpdated = await User.findById(id);
        await userUpdated.todos.push(req.body);
        const save = await userUpdated.save();
        res.status(200)
        res.json(save);

    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (req, res) => {

    try {
        const id = req.params.id;
        console.log(req.body);
        await User.deleteOne({ _id: id })
        res.status(200)
        res.send('user deleted');

    } catch (error) {
        console.log(error);
    }
}



export const registerAdmin = async (req, res) => {
    let { firstName, lastName, email, password } = req.body;
    if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]).{8,}$/.test(
            password
        )
    ) {
        res
            .status(400)
            .json({
                message: 'Password should contain number, uppercase, lowercase, special character.'
            });
        return;
    }
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }
    password = await bcrypt.hash(password, 10);
    try {
        const role = "admin";
        await User.create({ email, password, firstName, lastName, role });

        res.status(201).send('admin created');
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}


export const registerUser = async (req, res) => {
    let { firstName, lastName, email, password } = req.body;


    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]).{8,}$/.test(
            password
        )
    ) {
        res
            .status(400)
            .json({
                message: 'Password should contain number, uppercase, lowercase, special character.'
            });
        return;
    }

    password = await bcrypt.hash(password, 10);
    /*  try {
         const role = "user";
         
         await User.create({ firstName, lastName, email, password, role });
 
         res.status(201).send('user created');
     } catch (error) {
         console.error(error);
         res.status(500).send(error);
     } */
    const role = "user";
    const userCreated = await User.create({ firstName, lastName, email, password, role });

    if (userCreated) {


        const user = await User.findOne({ email: email });


        if (user) {

            console.log('User._id', user._id);
            const tokenData = {
                userId: user._id,
                email: user.email,

            }

            const token = jwt.sign(tokenData, process.env.JWT_KEY)
            console.log('User', user);
            return res.json({
                message: 'success',
                data: {
                    user: user,
                    token: token,
                }
            });

        }

    } else {
        return res.status(500).json({
            message: 'Fehler bei Konto erstellen!'
        })
    }
}

    export const loginUser = async (req, res) => {
        const data = req.body;
        if (!data.email || !data.password) {
            return res.status(400).send('Email oder Passwort leer')
        }

        const user = await User.findOne({ email: data.email });


        if (user) {
            const isValid = await bcrypt.compare(data.password, user.password);

            if (isValid) {

                const tokenData = {
                    userId: user._id,
                    email: user.email,

                }

                const token = jwt.sign(tokenData, process.env.JWT_KEY)

                return res.json({
                    message: 'success',
                    data: {
                        user: user,
                        token: token,
                    }
                });
            } else {
                return res.status(402).json({
                    message: 'Falsches Passwort!'
                })

            }
        } else {
            return res.status(400).json({
                message: 'Konto nicht gefunden!'
            })
        }
    } 
