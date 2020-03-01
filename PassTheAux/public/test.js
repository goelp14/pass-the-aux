document.addEventListener("DOMContentLoaded", event => {
    
    const app = firebase.app();
    console.log(app);
    const db = firebase.firestore();
    console.log(db)
    const song = db.collection('Rooms');
    console.log(song);
    let djCode = song.doc('ROM1');
    //addRoom('ROM2', 'DJ01');
    //addSong('ROM2', "test3", "url2", "utub4");
    //getSongs("ROM2");
    addVote('ROM2', 'test3')
});

function getSongs(Room_code) {
    let song = {
        name: "null",
        url: "null",
        type:"null",
        votes: 0
    };
    let songs = [];
    const app = firebase.app();
    const db = firebase.firestore();
    const rooms = db.collection('Rooms');
    rooms.doc(Room_code).collection('SONGS')
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            data = doc.data();
            song['name'] = doc.id;
            song['url'] = doc.get('url');
            song['type'] = doc.get('type');
            song['votes'] = doc.get('votes');
            songs.push(song);
        });
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