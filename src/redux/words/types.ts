export interface Words {}

export interface WordsState {
  words: {
    wordsData: Words[];
    isLoading: boolean;
  };
}
