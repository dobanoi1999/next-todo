import connectDB from '../../../utils/connectDB'
import User from '../../../model/user'
import bcrypt from 'bcrypt'
import { createToken } from '../../../utils/createToken'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await login(req, res);
            break;
    }
}
const login = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password)
            return res.status(400).json({ msg: "please add all fill" })
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ msg: "email not exist" })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ msg: "Password not true " })

        const token = await createToken({ id: user._id })
        res.json({
            msg: "Login Success",
            data: {
                username: user.username,
                token
            }
        })

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}