// https://react-learnwords-example.herokuapp.com/words?group=0&page=0
const HOST = "https://react-learnwords-example.herokuapp.com";

interface Iword {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}

export const api = {
  async createUser(user: string) {
    const rawResponse = await fetch(`${HOST}/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const content = await rawResponse.json();
    localStorage.setItem("user", `${content}`);
    console.log("###content", content);
  },

  async signInUser(user: string) {
    const rawResponse = await fetch(`${HOST}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const content = await rawResponse.json();
    localStorage.setItem("user", `${content}`);
    console.log("###content", content);
  },
  // getWords(group: number, page: number) {
    async getWords(group: number, page: number) {
    const rawResponse = await fetch(`${HOST}/words?group=${group}&page=${page}`);
    const rawWards = await rawResponse.json();
    return rawWards;
  },
};
