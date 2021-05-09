import auth from "../../../middleware/auth";
import User from '../../../model/user'
import connectDB from "../../../utils/connectDB";

connectDB()
export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getTodo(req, res)
            break;
        case "POST":
            await addTodo(req, res)
            break;

    }
}
const getTodo = async (req, res) => {

    try {
        const user = await auth(req, res);

        const { todo } = user
        return res.json({ todo })
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}
const addTodo = async (req, res) => {
    try {
        const { data } = req.body

        const user = await auth(req, res);
        const newTodo = user.todo
        newTodo.push(data)
        await User.findByIdAndUpdate(user._id, {
            todo: newTodo
        })
        return res.json({ msg: "Add success", newTodo })
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}