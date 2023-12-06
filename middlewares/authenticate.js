import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js';
export const isAuthenticate = async (req, res, next) => {

    try {

        const { token } = req.cookies;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "You are not authenticated"
            })
        }
        // decodedData is _id of the user that is stored in token
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedData._id);

        next();

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "You are not authenticated"
        })
    }
}