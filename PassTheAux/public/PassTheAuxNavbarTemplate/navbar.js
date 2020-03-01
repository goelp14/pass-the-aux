document.addEventListener("DOMContentLoaded", () => loaded(), false);

async function loaded() {
    document.getElementById("guest_room_num").innerHTML = sessionStorage.getItem("roomcode");
    console.log(sessionStorage.getItem("roomcode"));
}

