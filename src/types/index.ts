export type SignUpFormPayload = {
  name: string;
  email: string;
  password: string;
};

export type AuthFormResult = {
  user: {
    name: string;
    email: string;
    password: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
};


export type SignInFormPayload = {
  email: string;
  password: string;
}