interface userType {
  name: string;
  email: string;
  country: string;
  age: number;
}
interface userStats {
  totalGames: number;
  bestPoints: number;
  bestTotalWords: number;
  totalPoints: number;
  totalWords: number;
}

export interface userState {
  user: {
    currentUser: null | {}
    userData: null | userType
    userStats: null | userStats
  };
}
