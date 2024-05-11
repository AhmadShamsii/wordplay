interface userType {
  name: string;
  email: string;
  country: string;
  age: number;
}

export interface userState {
  user: {
    currentUser: null | {}
    userData: null | userType
    userStats: null | {}
  };
}
