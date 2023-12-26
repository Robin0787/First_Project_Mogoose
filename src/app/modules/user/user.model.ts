import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { TUser, UserModel } from "./user.interface";

const UserSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
      required: false,
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

UserSchema.statics.isUserExistsByCustomId = async function (id: string) {
  const result = await User.findOne({ id }).select("+password");
  return result;
};

UserSchema.statics.isPasswordCorrect = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt
    .compare(plainTextPassword, hashedPassword)
    .then((result) => {
      return result;
    });
};

UserSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimeStamp: Date,
  JWTIssuedTimeStamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimeStamp).getTime() / 1000;
  return passwordChangedTime > JWTIssuedTimeStamp;
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
