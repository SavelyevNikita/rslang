import { api } from "./../../api/server";

interface statisticType {
  learnedWords: number;
  optional: {
    newWordsAudiocall: string;
    allRaundsAudiocall: number;
    RightAnswersAudiocall: number;
    correctAnswerInRowInAudiocall: number;

    newWordsSprint: string;
    allRaundsSprint: number;
    RightAnswersSprint: number;
    correctAnswerInRowInSprint: number;

    newWords: string;
    allRaunds: number;
    allRightAnswers: number;
    learnedWords: string;
  };
}
export class OldStatistics {
  myApi: statisticType;
  learnedWordsNumber: number;

  newWordsAudiocall: string[];
  allRaundsAudiocall: number;
  RightAnswersAudiocall: number;
  correctAnswerInRowInAudiocall: number;

  newWordsSprint: string[];
  allRaundsSprint: number;
  RightAnswersSprint: number;
  correctAnswerInRowInSprint: number;

  newWords: { rightAnswers: number; used: number; wordId: string }[];
  allRaunds: number;
  allRightAnswers: number;
  learnedWords: string[];

  constructor() {}
  async getStatistics() {
    const myApi = await api.getStatistics();
    this.myApi = myApi;
    this.learnedWordsNumber = this.myApi.learnedWords;
    this.newWordsAudiocall = JSON.parse(this.myApi.optional.newWordsAudiocall);
    this.allRaundsAudiocall = this.myApi.optional.allRaundsAudiocall;
    this.RightAnswersAudiocall = this.myApi.optional.RightAnswersAudiocall;
    this.correctAnswerInRowInAudiocall =
      this.myApi.optional.correctAnswerInRowInAudiocall;

    this.newWordsSprint = JSON.parse(this.myApi.optional.newWordsSprint);
    this.allRaundsSprint = this.myApi.optional.allRaundsSprint;
    this.RightAnswersSprint = this.myApi.optional.RightAnswersSprint;
    this.correctAnswerInRowInSprint =
      this.myApi.optional.correctAnswerInRowInSprint;

    this.newWords = JSON.parse(this.myApi.optional.newWords);
    console.log("old", this.newWords, this.myApi.optional.newWords);
    this.allRaunds = this.myApi.optional.allRaunds;
    this.allRightAnswers = this.myApi.optional.allRightAnswers;
    this.learnedWords = JSON.parse(this.myApi.optional.learnedWords);
  }
}
