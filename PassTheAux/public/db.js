document.addEventListener("DOMContentLoaded", () => loaded(), false);

async function loaded() {
    const app = firebase.app();
    const db = firebase.firestore();
    const song = db.collection('Rooms');
    let djCode = song.doc('0000');
    addRoom('0000', 'DJ01');
    addSong('0000', "test3", "url2", "utub4");
    getSongs("0000");
    addVote('0000', 'test3');
    let hasCode = await hasDjCode('0000', 'DJ01');
    let songs = await getSongs('0000');
    console.log(songs);
    let song1 = songs[0];
}

async function getSongs(Room_code) {
    let song = {
        name: "null",
        url: "null",
        type:"null",
        votes: 0
    };
    const app = firebase.app();
    const db = firebase.firestore();
    const rooms = db.collection('Rooms');
    let songs = rooms.doc(Room_code).collection('SONGS')
    .get()
    .then(function(querySnapshot) {
        let list = [];
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            data = doc.data();
            song['name'] = doc.id;
            song['url'] = doc.get('url');
            song['type'] = doc.get('type');
            song['votes'] = doc.get('votes');
            list.push(song);
        });
        return list;
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    return songs;
}

function addSong(Room, name, songUrl, songType) {
    numVotes = 0;
    const app = firebase.app();
    const db = firebase.firestore();
    const rooms = db.collection('Rooms');
    rooms.doc(Room).collection('SONGS').doc(name).set({
        url: songUrl,
        type: songType,
        votes: numVotes
    });
}

function addRoom(room_code, dj_code) {
    const app = firebase.app();
    const db = firebase.firestore();
    const rooms = db.collection('Rooms');
    rooms.doc(room_code).set({
        DJCODE: dj_code
    });
}

function deleteSong(room_code, song_name) {
    const app = firebase.app();
    const db = firebase.firestore();
    const rooms = db.collection('Rooms');
    let room = rooms.doc(room_code);
    room.collection('SONGS').doc(song_name).delete();
}

function deleteRoom(room_code) {
    const app = firebase.app();
    const db = firebase.firestore();
    const rooms = db.collection('Rooms');
    let room = rooms.doc(room_code);
    room.delete();
}

function addVote(room_code, song_name) {
    const app = firebase.app();
    const db = firebase.firestore();
    const rooms = db.collection('Rooms');
    let room = rooms.doc(room_code);
    let numVotes = 0;
    room.collection('SONGS').doc(song_name).get()
    .then(function(doc) {
            numVotes = doc.get('votes');
    });
    numVotes += 1;

    room.collection('SONGS').doc(song_name).set({
        votes: numVotes
    }, { merge: true });
}

function removeVote(room_code, song_name) {
    const app = firebase.app();
    const db = firebase.firestore();
    const rooms = db.collection('Rooms');
    let room = rooms.doc(room_code);
    let numVotes = 0;
    room.collection('SONGS').doc(song_name).get()
    .then(function(doc) {
            numVotes = doc.get('votes');
    });
    numVotes -= 1;

    room.collection('SONGS').doc(song_name).set({
        votes: numVotes
    }, { merge: true });
}

 async function hasDjCode(room_code, dj_code) {
    const app = firebase.app();
    const db = firebase.firestore();
    const rooms = db.collection('Rooms');
    let room = rooms.doc(room_code);
    let result = room.get().then(function(doc) {
        let actual_code = doc.get('DJCODE');
        if (actual_code == dj_code) {
            return true;
        } else {
            return false;
        }
    });
    return result;
    
}

function genRoomCode() {
    let x = Math.floor((Math.random() * 10000));
    return x.toString();
}

function genDjCode() {
    let x = Math.floor((Math.random() * 10000));
    return "DJ" + x.toString(); 
}

function change_page_to_dj() {
    window.location.href = "dj_page/dj_page.html";
} 

function change_page_to_home(){
    window.location.href = "../index.html";
}

function joinRoom() {
    room_code = document.getElementById('roomcode').value;
    sessionStorage.setItem('roomcode', room_code);
    window.location.href = "PassTheAuxNavbarTemplate/";
}

function dj_create_room(){
    room_code = genRoomCode();
    djCode = genDjCode();
    sessionStorage.setItem('roomcode', room_code);
    sessionStorage.setItem('djcode', djCode);
    addRoom(room_code, djCode);
    window.location.href = "../djroom/djroom.html";
}

async function dj_rejoin_room() {
    room_code = document.getElementById('roomcode').value;
    dj_code = document.getElementById('djcode').value;
    let a = await hasDjCode(room_code, dj_code);
    if (!a) {
        alert("Those codes do not match. Sorry!");
    } else {
        sessionStorage.setItem('roomcode', room_code);
        sessionStorage.setItem('djcode', dj_code);
        window.location.href = "../djroom/djroom.html";

    }
}