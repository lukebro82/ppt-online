"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = void 0;
const state = {
    data: {
        currentGame: { computerPlay: "", userPlay: "" },
        history: { computerScore: 0, userScore: 0 },
    },
    listeners: [],
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
