import { catchAsyncError } from "./catchAsyncError.js";
import ErrHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAuthorized = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
       if (!token) {
        res.json({
            success: false,
            message: "Please login first",
        })    
    }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        console.log(decoded);
        next();
    
});
