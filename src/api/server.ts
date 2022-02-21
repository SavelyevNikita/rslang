// https://react-learnwords-example.herokuapp.com/words?group=0&page=0
export const HOST = "https://react-learnwords-example.herokuapp.com";

export const api = {
  async createUser(user: { name?: string; email: string; password: string }) {
    const rawResponse = await fetch(`${HOST}/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (rawResponse.status === 200) {
      const content = await rawResponse.json();
      localStorage.setItem("user", `${JSON.stringify(content)}}`);
    } else {
      alert("регистрация не выполнена...");
    }
  },

  async signInUser(user: { email: string; password: string }) {
    const rawResponse = await fetch(`${HOST}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (rawResponse.status === 200) {
      const content = await rawResponse.json();
      localStorage.setItem("user", `${JSON.stringify(content)}`);

      const statistic = {
        learnedWords: 0,
        optional: {
          newWordsAudiocall: JSON.stringify([]),
          allRaundsAudiocall: 0,
          RightAnswersAudiocall: 0,
          correctAnswerInRowInAudiocall: 0,

          newWordsSprint: JSON.stringify([]),
          allRaundsSprint: 0,
          RightAnswersSprint: 0,
          correctAnswerInRowInSprint: 0,

          newWords: JSON.stringify([]),
          allRaunds: 0,
          allRightAnswers: 0,
          learnedWords: JSON.stringify([]),
        },
      };
      await api.putStatistics(statistic);
      return content;
    } else {
      alert("вход не выполнен...");
    }
  },

  async getWords(group: number, page: number) {
    const rawResponse = await fetch(
      `${HOST}/words?group=${group}&page=${page}`
    );
    if (rawResponse.status === 200) {
      const rawWards = await rawResponse.json();
      return rawWards;
    } else {
      alert("ошибка запроса слов...");
    }
  },
  async getWordsId(group: number, page: number) {
    console.log("empty");
  },
  async getStatistics() {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const id = JSON.parse(localStorage.getItem("user")).userId;
    const rawResponse = await fetch(`${HOST}/users/${id}/statistics`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const rawWards = await rawResponse.json();
    return rawWards;
  },
  async putStatistics(statistic: {
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
  }) {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const id = JSON.parse(localStorage.getItem("user")).userId;
    await fetch(`${HOST}/users/${id}/statistics`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(statistic),
    });
  },
};
