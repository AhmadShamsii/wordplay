export interface WordsState {
  words: {
    wordsData: null;
    isLoading: boolean;
    error:string
  };
  score: {
    totalWords: number;
    points: number;
  };
  time: {
    isTimeStart: boolean;
    isTimeEnd: boolean;
  };
}
