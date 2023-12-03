import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { TUser, UserMethods, UserModel } from "./user.interface";

const UserSchema = new Schema<TUser, UserModel, UserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "faculty", "student"],
        message: "{VALUE} is not a valid value for role",
      },
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["in-progress", "blocked"],
        message: "{VALUE} is not a valid value for status",
      },
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.isUserExists = async function (id) {
  const result = await User.findOne({ id });
  return result;
};

// pre middleware for hashing user password.
UserSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt));
  next();
});

// post middleware for hiding user password.
UserSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<TUser, UserModel>("user", UserSchema);
