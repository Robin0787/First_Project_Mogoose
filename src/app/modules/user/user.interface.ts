import { Model } from "mongoose";

export type TUser = {
  id: string;
  password: string;
  needsPasswordChange?: boolean;
  role: "admin" | "faculty" | "student";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
};

export type UserMethods = {
  isUserExists(userId: string): Promise<TUser | null>;
};

export type UserModel = Model<TUser, Record<string, never>, UserMethods>;
