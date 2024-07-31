import { API_BASE_URL } from "./index.ts";
import { values } from "lodash";
import { rtdb } from "./rtdb";

type jugada = "piedra" | "papel" | "tijera";
type ganador = "user" | "computer" | "empate";

const state = {
  data: {
    currentGame: { computerPlay: "", userPlay: "" },
    history: { computerScore: 0, userScore: 0 },
    roomId: "",
    roomIdRtadb: "",
    userID: "",
    userName: "",
    userReady: false,
    userOnline: true,
    userChoice: "",
    userScore: 0,
    rivalReady: false,
    rivalOnline: false,
    rivalName: "",
    rivalChoice: "",
    rivalScore: 0,
  },

  listeners: [],

  auth(nombre: string) {
    return fetch(API_BASE_URL + "/auth", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        nombre: nombre,
      }),
    }).then((res) => {
      return res.json();
    });
  },

  createRoom(userId, userName) {
    return fetch(API_BASE_URL + "/rooms", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        name: userName,
      }),
    }).then((res) => {
      return res.json();
    });
  },

  async getRoomId(userId, roomId) {
    return fetch(API_BASE_URL + "/rooms/" + roomId + "?userId=" + userId, {
      method: "GET",
      headers: { "content-type": "application/json" },
    }).then((res) => {
      return res.json();
    });
  },

  async getRoomData(rtdbRoomId) {
    return fetch(API_BASE_URL + "/room/" + rtdbRoomId, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let newData = values(data);
        newData.forEach((e) => {
          if (e.name == state.data.userName) {
            state.data.userOnline = e.online;
            state.data.userReady = e.start;
            state.data.userScore = e.score;
            state.data.userChoice = e.choice;
          } else if (e.name !== state.data.userName) {
            state.data.rivalName = e.name;
            state.data.rivalOnline = e.online;
            state.data.rivalReady = e.start;
            state.data.rivalScore = e.score;
            state.data.rivalChoice = e.choice;
          }
        });
      });
  },

  async updateRoom(rtdbRoomId, userId) {
    return fetch(API_BASE_URL + "/room/" + rtdbRoomId, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userID: userId,
        updateObject: {
          choice: state.data.userChoice,
          name: state.data.userName,
          online: state.data.userOnline,
          score: state.data.userScore,
          start: state.data.userReady,
        },
      }),
    }).then((res) => {
      return res.json();
    });
  },

  async joinRoom(rtdbRoomId, userId, name) {
    return fetch(API_BASE_URL + "/room/join", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        name: name,
        rtdbRoomId: rtdbRoomId,
      }),
    }).then((res) => {
      return res.json();
    });
  },

  onRtdb() {
    const rtdbID = state.data.roomIdRtadb;
    const chatRoomsRef = rtdb.ref("/pptrooms/" + rtdbID);
    chatRoomsRef.on("value", (snapshot) => {
      const newSnap = snapshot.val();
      let newData = values(newSnap);

      newData.forEach((e) => {
        if (e.name == state.data.userName) {
          state.data.userOnline = e.online;
          state.data.userReady = e.start;
          state.data.userScore = e.score;
        } else if (e.name !== state.data.userName) {
          state.data.rivalName = e.name;
          state.data.rivalOnline = e.online;
          state.data.rivalReady = e.start;
          state.data.rivalScore = e.score;
        }
      });

      for (const cb of this.listeners) {
        cb();
      }
    });
  },

  setUserId(id: string) {
    const currentState = this.getState();
    currentState.userID = id;
  },

  setRoomId(id: string) {
    const currentState = this.getState();
    currentState.roomId = id;
  },

  setUserMove(move: jugada) {
    const currentState = this.getState();
    currentState.currentGame.userPlay = move;
  },

  setComputerMove(move: jugada) {
    const currentState = this.getState();
    currentState.currentGame.computerPlay = move;
  },

  runPlayComputer() {
    let numeroRandom = Math.floor(Math.random() * 9) + 1;
    let jugada: jugada = "papel";
    if (numeroRandom < 4) {
      jugada = "piedra";
    } else if (numeroRandom >= 4 && numeroRandom <= 6) {
      jugada = "papel";
    } else jugada = "tijera";

    this.setComputerMove(jugada);
  },

  whoWins(userPlay, computerPlay) {
    let winner: ganador = "empate";

    if (userPlay == "papel" && computerPlay == "piedra") {
      winner = "user";
    }
    if (userPlay == "papel" && computerPlay == "tijera") {
      winner = "computer";
    }
    if (userPlay == "piedra" && computerPlay == "tijera") {
      winner = "user";
    }
    if (userPlay == "piedra" && computerPlay == "papel") {
      winner = "computer";
    }
    if (userPlay == "tijera" && computerPlay == "papel") {
      winner = "user";
    }
    if (userPlay == "tijera" && computerPlay == "piedra") {
      winner = "computer";
    }

    this.pushHistory(winner);
    return winner;
  },

  whoWinsOnline(user, rival) {
    let winner: ganador = "empate";

    if (user == "papel" && rival == "piedra") {
      winner = "user";
    }
    if (user == "papel" && rival == "tijera") {
      winner = "computer";
    }
    if (user == "piedra" && rival == "tijera") {
      winner = "user";
    }
    if (user == "piedra" && rival == "papel") {
      winner = "computer";
    }
    if (user == "tijera" && rival == "papel") {
      winner = "user";
    }
    if (user == "tijera" && rival == "piedra") {
      winner = "computer";
    }

    if (winner == "user") {
      state.data.userScore++;
    }

    return winner;
  },

  pushHistory(ganador: ganador) {
    const currentState = this.getState();
    if (ganador == "computer") {
      currentState.history.computerScore++;
    } else if (ganador == "user") {
      currentState.history.userScore++;
    }
  },

  getState() {
    return this.data;
  },

  setState(state) {
    this.data = state;
    for (const cb of this.listeners) {
      cb();
    }
  },

  subscribe(cb: (any) => any) {
    this.listeners.push(cb);
  },
};

export { state };
