import jwt from "jsonwebtoken";
import connectDB from "../../../utils/connectDB";
connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await checkUser(req, res)
            break;

            ;
    }
}
const checkUser = async (req, res) => {
    try {
        const token = req.headers.authorization;


        if (!token || token === "null") return res.json(false)
        const decode = await jwt.verify(token, process.env.PRIVATE_KEY);
        console.log("object")
        if (!decode) return res.json(false);
        return res.json(true)
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}