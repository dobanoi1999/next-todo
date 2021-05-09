import auth from "../../../middleware/auth";
import User from '../../../model/user';
import connectDB from "../../../utils/connectDB";

connectDB()
export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await completeTodo(req, res)
            break;

    }
}
const completeTodo = async (req, res) => {

    try {
        const { id } = req.query

        const user = await auth(req, res);
        const { todo } = user
        const index = user.todo.findIndex(i => i.id === id)
        if (index === -1) return res.status(400).json({ msg: "Item not found" })
        todo[index].complete = true

        await User.findByIdAndUpdate(user._id, {
            todo: [...todo]
        })
        res.json({ msg: "success" })


    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}
