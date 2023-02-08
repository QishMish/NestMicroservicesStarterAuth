interface SignUpUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignInUser {
  email: string;
  password: string;
}

export { SignUpUser, SignInUser };
