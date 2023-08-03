let game = document.getElementById("game")
let shootbutton = document.getElementById("shootbutton")
let hero = document.getElementById("stalker")
let heroCoords = [0,0]
game.style.height = window.innerWidth + "px"
shootbutton.onclick = function (event) {
    console.log("shot!")
}
document.body.onkeydown = function (event) {
    console.log(event.keyCode);
    if (event.keyCode == 87) {
        heroCoords[1]= heroCoords[1] - 10
        hero.style.top = heroCoords[1] + "px"
    }
    if (event.keyCode == 65) {
        heroCoords[0]= heroCoords[0] - 10
        hero.style.left = heroCoords[0] + "px"
    }
    if (event.keyCode == 83) {
        heroCoords[1]= heroCoords[1] + 10
        hero.style.top = heroCoords[1] + "px"
    }
    if (event.keyCode == 68) {
        heroCoords[0]= heroCoords[0] + 10
        hero.style.left = heroCoords[0] + "px"
    }
}