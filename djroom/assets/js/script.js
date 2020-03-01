document.addEventListener("DOMContentLoaded", () => loaded(), false);

var player,
    time_update_interval = 0;

let playlist_songs = "UNZqm3dxd2w";
var global_id; 

var room;

async function loaded() {
    const app = firebase.app();
    console.log(app);
    const db = firebase.firestore();
    console.log(db)
    const song = db.collection('Rooms');
    console.log(song);
    let djCode = song.doc('0000');
    addRoom('0000', 'DJ01');
    addSong('0000', "test3", "url2", "utub4");
    getSongs("0000");
    addVote('0000', 'test3');
    let hasCode = await hasDjCode('0000', 'DJ01');
    let songs = await getSongs('0000');
    console.log(songs);
    let song1 = songs[0];
    console.log(hasCode);
    console.log(song1);
    console.log(song1['name']);
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


//**********************
// youtube stuff
function addmusic(){
    var input = document.getElementById("search").value;
    //alert(input);
    addSong(room, input, "", "");
}

async function getmusic(){
    var song = await getSongs(room);
    return song[0]['name'];
}

async function playnextsong() {
    // remove song from playlist, then go to next song
    deleteSong(room, global_id);

    global_id = await getmusic();
    
    player.loadPlaylist({listType:"search",
    list:global_id,
    index:0,
    startSeconds:0});   

    // var input = document.getElementById("userInput").value;
    // //var id = input.substr(input.length - 11);
    // global_id = input;
    // // player.loadVideoById(global_id, 0, "large");
    // //alert(global_id);
}

function onYouTubeIframeAPIReady() {

    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: global_id,
        playerVars: {
            color: 'white',
            playlist: playlist_songs
        },
        events: {
            onReady: initialize,
            onStateChange: onPlayerStateChange
        }
    });
}
function onPlayerStateChange(event) {        
    if(event.data === 0) {         
        playnextsong(); 
        // player.loadPlaylist({listType:"search",
        // list:"never gonna give you up",
        // index:0,
        // startSeconds:0});
    }
}

function initialize(){

    // Update the controls on load
    updateTimerDisplay();
    updateProgressBar();

    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function () {
        updateTimerDisplay();
        updateProgressBar();
    }, 1000);


    $('#volume-input').val(Math.round(player.getVolume()));
}


// This function is called by initialize()
function updateTimerDisplay(){
    // Update current time text display.
    $('#current-time').text(formatTime( player.getCurrentTime() ));
    $('#duration').text(formatTime( player.getDuration() ));
}


// This function is called by initialize()
function updateProgressBar(){
    // Update the value of our progress bar accordingly.
    $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
}


// // Progress bar

// $('#progress-bar').on('mouseup touchend', function (e) {

//     // Calculate the new time for the video.
//     // new time in seconds = total duration in seconds * ( value of range input / 100 )
//     var newTime = player.getDuration() * (e.target.value / 100);

//     // Skip video to new time.
//     player.seekTo(newTime);

// });


// // Playback

// $('#play').on('click', function () {
//     player.playVideo();
// });


// $('#pause').on('click', function () {
//     player.pauseVideo();
// });


// // Sound volume


// $('#mute-toggle').on('click', function() {
//     var mute_toggle = $(this);

//     if(player.isMuted()){
//         player.unMute();
//         mute_toggle.text('volume_up');
//     }
//     else{
//         player.mute();
//         mute_toggle.text('volume_off');
//     }
// });

// $('#volume-input').on('change', function () {
//     player.setVolume($(this).val());
// });


// // Other options


// $('#speed').on('change', function () {
//     player.setPlaybackRate($(this).val());
// });

// $('#quality').on('change', function () {
//     player.setPlaybackQuality($(this).val());
// });


// // Playlist

// $('#next').on('click', function () {
//     player.nextVideo()
// });

// $('#prev').on('click', function () {
//     player.previousVideo()
// });


// // Load video

// $('.thumbnail').on('click', function () {

//     var url = $(this).attr('data-video-id');

//     player.cueVideoById(url);

// });


// // Helper Functions

// function formatTime(time){
//     time = Math.round(time);

//     var minutes = Math.floor(time / 60),
//         seconds = time - minutes * 60;

//     seconds = seconds < 10 ? '0' + seconds : seconds;

//     return minutes + ":" + seconds;
// }


// $('pre code').each(function(i, block) {
//     hljs.highlightBlock(block);
// });