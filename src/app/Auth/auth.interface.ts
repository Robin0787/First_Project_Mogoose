export type TLoginUser = {
  id: string;
  password: string;
};

export type TPasswordChange = {
  currentPassword: string;
  newPassword: string;
};

export type TResetPassword = {
  id: string;
  newPassword: string;
};
