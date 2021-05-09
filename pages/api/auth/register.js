import connectDB from '../../../utils/connectDB'
import User from '../../../model/user'
import bcrypt from 'bcrypt'
import { createToken } from '../../../utils/createToken'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await register(req, res);
            break;
    }
}
const register = async (req, res) => {
    try {

        const { email, username, password } = req.body

        if (!email || !username || !password)
            return res.status(400).json({ msg: "please add all fill" })
        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ msg: "email have exist" })
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })
        await newUser.save()

        const token = await createToken({ id: newUser._id })


        res.json({
            msg: "register Success",
            data: {
                username,
                token
            }
        })

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}