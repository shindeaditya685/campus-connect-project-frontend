export type User = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  address: string;
  avatar: string;
  description: string;
  contactNumber: string;
  createdAt: string;
  updatedAt: string;
};

// You might also want to create a type for the updateable fields
export type UpdateableUserFields = Omit<User, "id" | "createdAt" | "updatedAt">;

// If you need a type for the minimum required fields when creating a user
export type CreateUserFields = Pick<User, "username" | "email" | "fullName"> &
  Partial<UpdateableUserFields>;
