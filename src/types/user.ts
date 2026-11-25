export type UserRole = "admin";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  passwordHash: string;
  createdAt: string;
};

export type SessionUser = Pick<StoredUser, "id" | "name" | "email" | "role">;
