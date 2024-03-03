import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUserRole = keyof typeof USER_ROLE;

export interface TUser {
  id: string;
  email: string;
  password: string;
  needsPasswordChange?: boolean;
  passwordChangedAt?: Date;
  role: "superAdmin" | "admin" | "faculty" | "student";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(userId: string): Promise<TUser | null>;
  isPasswordCorrect(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<Boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    JWTIssuedTimeStamp: number,
  ): Boolean;
}
