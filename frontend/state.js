"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = void 0;
const _1 = require(".");
const lodash_1 = require("lodash");
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
    auth(nombre) {
        return fetch(_1.API_BASE_URL + "/auth", {
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
        return fetch(_1.API_BASE_URL + "/rooms", {
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
    async getRoomData(rtdbRoomId) {
        return fetch(_1.API_BASE_URL + "/room/" + rtdbRoomId, {
            method: "GET",
        })
            .then((res) => {
            return res.json();
        })
            .then((data) => {
            this.setDataRoom(data);
        });
    },
    setDataRoom(data) {
        const currentState = this.getState();
        let newData = (0, lodash_1.values)(data);
        this.setState(currentState);
        newData.forEach((e) => {
            if (e.nombre == state.data.userName) {
                state.data.userOnline = e.online;
                state.data.userReady = e.start;
                state.data.userScore = e.score;
            }
            else {
                state.data.rivalName = e.name;
                state.data.rivalOnline = e.online;
                state.data.rivalReady = e.start;
                state.data.rivalScore = e.score;
            }
        });
    },
    async updateRoom(rtdbRoomId, userId) {
        return fetch(_1.API_BASE_URL + "/room/" + rtdbRoomId, {
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
    joinRoom(rtdbRoomId) { },
    setUserId(id) {
        const currentState = this.getState();
        currentState.userID = id;
    },
    setUserName(name) {
        const currentState = this.getState();
        currentState.userName = name;
    },
    setRoomId(id) {
        const currentState = this.getState();
        currentState.roomId = id;
    },
    setUserMove(move) {
        const currentState = this.getState();
        currentState.currentGame.userPlay = move;
    },
    setComputerMove(move) {
        const currentState = this.getState();
        currentState.currentGame.computerPlay = move;
    },
    runPlayComputer() {
        let numeroRandom = Math.floor(Math.random() * 9) + 1;
        let jugada = "papel";
        if (numeroRandom < 4) {
            jugada = "piedra";
        }
        else if (numeroRandom >= 4 && numeroRandom <= 6) {
            jugada = "papel";
        }
        else
            jugada = "tijera";
        this.setComputerMove(jugada);
    },
    whoWins(userPlay, computerPlay) {
        let winner = "empate";
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
    pushHistory(ganador) {
        const currentState = this.getState();
        if (ganador == "computer") {
            currentState.history.computerScore++;
        }
        else if (ganador == "user") {
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
    subscribe(cb) {
        this.listeners.push(cb);
    },
};
exports.state = state;
