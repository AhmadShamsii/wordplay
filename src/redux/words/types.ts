export interface Words {}

export interface WordsState {
  words: {
    wordsData: null;
    isLoading: boolean;
  };
  score: {
    words: number;
    points: number;
  }
}
