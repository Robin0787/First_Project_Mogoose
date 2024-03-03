import config from "../config";
import { USER_ROLE } from "../modules/user/user.constant";
import { TUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

const superAdminData: TUser = {
  id: "SA-0001",
  email: "superadmin@gmail.com",
  password: config.super_admin_password as string,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: "in-progress",
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({ role: USER_ROLE.superAdmin });
  if (!isSuperAdminExists) {
    await User.create(superAdminData);
  }
};

export default seedSuperAdmin;
