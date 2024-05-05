import { USER_ROLE } from "@/constants/role";

export type IMeta = {
  page: Number;
  limit: Number;
  total: Number;
};

export type UserRole = keyof typeof USER_ROLE;
