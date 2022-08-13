import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    picture: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// workaround
export interface HookNextFunction {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error?: Error): any;
}

userSchema.pre("save", async function (next: HookNextFunction) {
    // this as UserDocument unnecessary here
    let user = this;

    if (!user.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
    const hash = await bcrypt.hashSync(user.password as string, salt);
    user.password = hash;
    return next();
});

userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    // must be as USerDocument
    const user = this as UserDocument;
    return bcrypt
        .compare(candidatePassword, user.password as string)
        .catch((error) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
