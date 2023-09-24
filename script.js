let game = document.getElementById("game")
let shootbutton = document.getElementById("shootbutton")
let hero = document.getElementById("stalker")
let heroCoords = [0, 0]
game.style.height = window.innerWidth + "px"
shootbutton.onclick = function (event) {
    console.log("shot!")
}
document.body.onkeydown = function (event) {
    if (event.keyCode == 87) {
        heroCoords[1] = heroCoords[1] - 10
        if (heroCoords[1] < 0) {
            heroCoords[1] = 0
        }
        hero.style.top = heroCoords[1] + "px"
        hero.style.transform = "rotate(90deg)"
    }
    if (event.keyCode == 65) {
        heroCoords[0] = heroCoords[0] - 10
        if (heroCoords[0] < 0) {
            heroCoords[0] = 0
        }
        hero.style.left = heroCoords[0] + "px"
        hero.style.transform = "scaleX(1)"

    }
    if (event.keyCode == 83) {
        heroCoords[1] = heroCoords[1] + 10
        if (heroCoords[1] > (window.innerWidth - 100)) {
            heroCoords[1] = window.innerWidth - 100
        }
        hero.style.top = heroCoords[1] + "px"
        hero.style.transform = "rotate(-90deg)"

    }
    if (event.keyCode == 68) {
        heroCoords[0] = heroCoords[0] + 10
        if (heroCoords[0] > (window.innerWidth - 100)) {
            heroCoords[0] = window.innerWidth - 100
        }
        hero.style.left = heroCoords[0] + "px"
        hero.style.transform = "scaleX(-1)"
    }
    if (event.keyCode == 32) {
        let bubble = document.createElement("img")
        bubble.src = "bubble.png"
        bubble.style.top = heroCoords[1] + "px"
        bubble.style.left = heroCoords[0] + "px"
        game.appendChild(bubble)
        bubble.setAttribute("data-x", heroCoords[0])
        bubble.setAttribute("data-y", heroCoords[1])
        bubble.classList.add("bubble")


    }
}
function moveHero(direction) {
    console.log(direction);
    if (direction == 'up') {
        heroCoords[1] = heroCoords[1] - 10
        hero.style.top = heroCoords[1] + "px"
    }
    if (direction == 'left') {
        heroCoords[0] = heroCoords[0] - 10
        hero.style.left = heroCoords[0] + "px"
    }
    if (direction == 'down') {
        heroCoords[1] = heroCoords[1] + 10
        hero.style.top = heroCoords[1] + "px"
    }
    if (direction == 'right') {
        heroCoords[0] = heroCoords[0] + 10
        hero.style.left = heroCoords[0] + "px"
    }
}

let gameInterval = setInterval(function () {
    let enemy = document.createElement("img")
    enemy.classList.add("enemy")
    enemy.src = "creeper.png"
    let enemyY = Math.random() * (window.innerWidth - 100)
    enemy.style.top = enemyY + "px"
    enemy.setAttribute("data-x", 0)
    enemy.setAttribute("data-y", enemyY)
    game.appendChild(enemy)
}, 500)
setInterval(() => {
    let enemies = document.getElementsByClassName("enemy")
    let bubbles = document.getElementsByClassName("bubble")
    if (enemies.length > 0) {
        for (let index = 0; index < enemies.length; index++) {
            let creeper = enemies[index]
            let newx = parseInt(creeper.getAttribute("data-x")) + 1
            creeper.setAttribute("data-x", newx)
            creeper.style.left = newx + "px"
            if (parseInt(creeper.getAttribute("data-x")) > (window.innerWidth - 150)) {
                creeper.remove()
            }
            for (let index = 0; index < bubbles.length; index++) {
                let bubble = bubbles[index]
                console.log(Math.abs(creeper.getAttribute("data-x") - bubble.getAttribute("data-x")) < 50 && Math.abs(creeper.getAttribute("data-y") - bubble.getAttribute("data-y")) < 50);
                if (Math.abs(creeper.getAttribute("data-x") - bubble.getAttribute("data-x")) < 50 && Math.abs(creeper.getAttribute("data-y") - bubble.getAttribute("data-y")) < 50) {
                    creeper.remove()
                }
            }
        }
    }
    if (bubbles.length > 0) {
        for (let index = 0; index < bubbles.length; index++) {
            let bubble = bubbles[index]
            let newx = parseInt(bubble.getAttribute("data-x")) - 5
            bubble.setAttribute("data-x", newx)
            bubble.style.left = newx + "px"
            if (parseInt(bubble.getAttribute("data-x")) < 50) {
                bubble.remove()
            }
        }
    }
}, 10);