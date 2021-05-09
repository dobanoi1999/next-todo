import jwt from "jsonwebtoken"
export const createToken = (payload) => {
    return jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: "1d" })
}