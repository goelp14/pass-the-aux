function addSong() {
	let songRow = document.createElement("div");
	songRow.classList.add("row");
    let songBody = document.getElementById("songinsert");
	songRow.innerHTML = `<div class="iconbox">
            <div class="iconbox-text">
                <h2>Song Selection: Song Title</h2>
                <p>Vote to Skip:</p>
                <i class="fas fa-forward iconskip" id="skip2" onclick="handleClick2()"></i>
                <script>
                    function handleClick2() {
                        element = document.getElementById("skip2");
                        element.classList.toggle("voted");
                    }
                </script>
            </div>
        </div>`;
	songBody.append(itemRow);
}
