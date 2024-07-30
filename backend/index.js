"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const db_1 = require("./db");
const nanoid_1 = require("nanoid");
const cors = require("cors");
const path = require("path");
const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
const usersCollection = db_1.firestore.collection("pptusers");
const roomsCollection = db_1.firestore.collection("pptrooms");
app.post("/auth", (req, res) => {
    const { nombre } = req.body;
    usersCollection
        .where("nombre", "==", nombre)
        .get()
        .then((searchResponse) => {
        if (searchResponse.empty) {
            usersCollection
                .add({
                nombre,
            })
                .then((newUserRef) => {
                res.json({ id: newUserRef.id });
            });
        }
        else {
            res.json({
                id: searchResponse.docs[0].id,
            });
        }
    });
});
app.post("/rooms", (req, res) => {
    const { userId } = req.body;
    const { name } = req.body;
    usersCollection
        .doc(userId.toString())
        .get()
        .then((doc) => {
        if (doc.exists) {
            const romRef = db_1.rtdb.ref("pptrooms/" + (0, nanoid_1.nanoid)());
            romRef
                .set({
                [userId]: {
                    choice: "",
                    name: name,
                    online: true,
                    start: false,
                    score: 0,
                },
            })
                .then(() => {
                const roomLongId = romRef.key;
                const roomId = 1000 + Math.floor(Math.random() * 999);
                roomsCollection
                    .doc(roomId.toString())
                    .set({ rtdbRoomId: roomLongId })
                    .then(() => {
                    res.json({ id: roomId.toString(), idLong: roomLongId });
                });
            });
        }
        else {
            res.status(401).json({ message: "no existis" });
        }
    });
});
app.get("/room/:rtdbRoomId", function (req, res) {
    const { rtdbRoomId } = req.params;
    const chatRoomsRef = db_1.rtdb.ref("/pptrooms/" + rtdbRoomId);
    chatRoomsRef.get().then((snapshot) => {
        res.json(snapshot);
    });
});
app.patch("/room/:rtdbRoomId", function (req, res) {
    const { rtdbRoomId } = req.params;
    const { userID } = req.body;
    const { updateObject } = req.body;
    const RoomsRef = db_1.rtdb.ref("/pptrooms/" + rtdbRoomId + "/" + userID);
    RoomsRef.update(updateObject).then(() => {
        res.json({ message: "ok" });
    });
});
app.get("/rooms/:roomId", (req, res) => {
    const { userId } = req.query;
    const { roomId } = req.params;
    usersCollection
        .doc(userId.toString())
        .get()
        .then((doc) => {
        if (doc.exists) {
            roomsCollection
                .doc(roomId)
                .get()
                .then((snap) => {
                const data = snap.data();
                res.json(data);
            });
        }
        else {
            res.status(401).json({ message: "no existis" });
        }
    });
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
