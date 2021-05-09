import jwt from "jsonwebtoken";
import User from "../model/user"


const auth = async (req, res) => {
    try {
        const token = req.headers.authorization;


        if (!token) return res.status(401).json({ msg: "Token is invalid" });
        const decode = await jwt.verify(token, process.env.PRIVATE_KEY);
        if (!decode) return res.status(401).json({ msg: "Invalid token" });

        const user = await User.findOne({ _id: decode.id });

        return user
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}
export default auth