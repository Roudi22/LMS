require("dotenv").config();
import mongoose, {Document, Model, Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const emailRegexPattern:RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    },
    role: string;
    isVerified: boolean;
    courses: Array<{courseId: string}>;
    comparePassword: (password: string) => Promise<boolean>;
    SignAccessToken: () => string;
    SignRefreshToken: () => string;
    }

    const userSchema:Schema = new Schema<IUser>({
        name: {
            type: String,
            required: [true, "Please enter your name"],
            maxLength: [30, "Your name cannot exceed 30 characters"]
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true, // unique email address for each user 
            match: [emailRegexPattern, "Please enter a valid email address"],

        },
        password: {
            type: String,
            minlength: [6, "Your password must be longer than 6 characters"],
            select: false // hide password from user 
        },
        avatar: {
            public_id:String,
            url:String,
        },
        role: {
            type: String,
            default: "user"
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        courses: [
            {
                courseId: String
            }
        ]
    }, {
        timestamps: true
    });

    // Hash password before saving user
    userSchema.pre<IUser>("save", async function(next) {
        if (!this.isModified("password")) { // if password is not modified then call next middleware 
            next();
        }
        this.password = await bcrypt.hash(this.password, 10);
        next();
    });

    // sign access token
    userSchema.methods.SignAccessToken = function() {
        return jwt.sign({id: this._id}, process.env.ACCESS_TOKEN || "", {expiresIn: "5m"});
    }

    // sign refresh token
    userSchema.methods.SignRefreshToken = function() {
        return jwt.sign({id: this._id}, process.env.REFRESH_TOKEN || "", {expiresIn: "3d"});
    }

    // Compare user password
    userSchema.methods.comparePassword = async function(enteredPassword: string) {
        return await bcrypt.compare(enteredPassword, this.password);
    }

    const userModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);
    export default userModel;