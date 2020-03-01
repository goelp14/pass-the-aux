document.addEventListener("DOMContentLoaded", () => loaded(), false);

async function loaded() {
    document.getElementById("guest_room_num").innerHTML = sessionStorage.getItem("roomcode");
    removeQueue();
    fillQueue();
    
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
        querySnapshot.forEach(async function(doc) {
            list.push(await getSong(Room_code, doc));
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


async function getSong(room_code, doc) {
    let song = {
        name: "null",
        url: "null",
        type:"null",
        votes: 0
    };
    const app = firebase.app();
    const db = firebase.firestore();
    song['name'] = doc.id;
    song['url'] = doc.get('url');
    song['type'] = doc.get('type');
    song['votes'] = doc.get('votes');
    return song;
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

function handleClick2(name) {
    let room_code = sessionStorage.getItem("roomcode");
    element = document.getElementById(name);
    if (element.classList.contains('voted')) {
        removeVote(room_code, name);
    } else {
        addVote(room_code, name);
    }
    element.classList.toggle("voted");
}

async function fillQueue() {
    let room_code = sessionStorage.getItem("roomcode");
    let songs = await getSongs(room_code);
    songs.reverse();
    console.log(songs.length);
    console.log(songs);
    songs.map((song) => {
        let songRow = document.createElement("div");
    songRow.classList.add("row");
    let songBody = document.getElementById("songinsert");
    songRow.innerHTML = `<div class="iconbox">
        <div class="iconbox-text">
            <h2>Song Selection: `+ song['name'] + `</h2>
            <p>Vote to Skip:</p>
            <i class="fas fa-forward iconskip" id="` + song['name'] + `" onclick="handleClick2('` + song['name'] + `')"></i>
            <script>
                
            </script>
        </div>
    </div>`;
    songBody.append(songRow);})
}

function removeQueue() {
    let songBody = document.getElementById("songinsert");
    songBody.innerHTML.value = ``;
}

function addmusic(){
    room = sessionStorage.getItem("roomcode");
    var input = document.getElementById("search").value;
    addSong(room, input, "", "");
    document.getElementById("search").value = "";
}