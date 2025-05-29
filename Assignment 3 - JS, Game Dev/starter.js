let poke_id;
let eggs = document.getElementsByClassName("egg");
for (let i = 0; i < eggs.length; i++) {
    eggs[i].addEventListener("click", () => egg_click(i));
    eggs[i].addEventListener("mouseover", () => egg_hover(i));
    eggs[i].addEventListener("mouseout", () => egg_no_hover(i));
}

let displays = document.getElementsByClassName("poke_display");
for (let i = 0; i < displays.length; i++) {
    displays[i].addEventListener("click", () => egg_click(i));
    displays[i].addEventListener("mouseover", () => egg_hover(i));
    displays[i].addEventListener("mouseout", () => egg_no_hover(i));
}

function egg_click(j) {
    if (j == 0) {
        poke_id = 7;
    } else if (j == 1) {
        poke_id = 172;
    } else if (j == 2) {
        poke_id = 1;
    } else {
        poke_id = 4;
    }
    localStorage.setItem("pokemon_number", poke_id);
    let audio = document.getElementById("audio");
    audio.play();
}

function egg_hover(j) {
    let color_name;
    if (j == 0) {
        color_name = "blue_name";
    } else if (j == 1) {
        color_name = "yellow_name";
    } else if (j == 2) {
        color_name = "green_name";
    } else {
        color_name = "red_name";
    }
    document.getElementById(color_name).style.zIndex = "1";
}

function egg_no_hover(j) {
    let color_name;
    if (j == 0) {
        color_name = "blue_name";
    } else if (j == 1) {
        color_name = "yellow_name";
    } else if (j == 2) {
        color_name = "green_name";
    } else {
        color_name = "red_name";
    }
    document.getElementById(color_name).style.zIndex = "-1";
}
