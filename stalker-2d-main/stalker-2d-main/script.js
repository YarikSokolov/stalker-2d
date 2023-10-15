let game = document.getElementById("game")
let shootbutton = document.getElementById("shootbutton")
let hero = document.getElementById("stalker")
let heroCoords = [0, 0]
let keys = []
game.style.width = window.innerHeight - 110 + "px"

game.style.height = game.offsetWidth + "px"
shootbutton.onclick = function (event) {
    console.log("shot!")
    if(!keys.includes(32)){
        keys.push(32)
    }
}
document.body.onkeyup = function (event) {
    keys.splice(keys.indexOf(event.keyCode), 1)
    console.log(keys)
}
function shoot() {
         let bubble = document.createElement("img")
        bubble.src = "bubble.png"
        bubble.style.top = heroCoords[1] + "px"
        bubble.style.left = heroCoords[0] + "px"
        game.appendChild(bubble)
        bubble.setAttribute("data-x", heroCoords[0])
        bubble.setAttribute("data-y", heroCoords[1])
        bubble.classList.add("bubble")
}
document.body.onkeydown = function (event) {
    if (!keys.includes(event.keyCode)) {
        keys.push(event.keyCode)


    }
    console.log(keys);
    // if (event.keyCode == 87) {
    //     heroCoords[1] = heroCoords[1] - 10
    //     if (heroCoords[1] < 0) {
    //         heroCoords[1] = 0
    //     }
    //     hero.style.top = heroCoords[1] + "px"
    //     hero.style.transform = "rotate(90deg)"
    // }
    // if (event.keyCode == 65) {
    //     heroCoords[0] = heroCoords[0] - 10
    //     if (heroCoords[0] < 0) {
    //         heroCoords[0] = 0
    //     }
    //     hero.style.left = heroCoords[0] + "px"
    //     hero.style.transform = "scaleX(1)"

    // }
    // if (event.keyCode == 83) {
    //     heroCoords[1] = heroCoords[1] + 10
    //     if (heroCoords[1] > (window.innerWidth - 100)) {
    //         heroCoords[1] = window.innerWidth - 100
    //     }
    //     hero.style.top = heroCoords[1] + "px"
    //     hero.style.transform = "rotate(-90deg)"

    // }
    // if (event.keyCode == 68) {
    //     heroCoords[0] = heroCoords[0] + 10
    //     if (heroCoords[0] > (window.innerWidth - 100)) {
    //         heroCoords[0] = window.innerWidth - 100
    //     }
    //     hero.style.left = heroCoords[0] + "px"
    //     hero.style.transform = "scaleX(-1)"
    // }
    // if (event.keyCode == 32) {
    //     let bubble = document.createElement("img")
    //     bubble.src = "bubble.png"
    //     bubble.style.top = heroCoords[1] + "px"
    //     bubble.style.left = heroCoords[0] + "px"
    //     game.appendChild(bubble)
    //     bubble.setAttribute("data-x", heroCoords[0])
    //     bubble.setAttribute("data-y", heroCoords[1])
    //     bubble.classList.add("bubble")


    // }
}
function moveHero(direction) {
    console.log(direction);
    if (direction == 'up') {
        if(!keys.includes(87) ){
            keys.push(87)
        }
    }
    if (direction == 'left') {
        if(!keys.includes(65) ){
            keys.push(65)
        }
    }
    if (direction == 'down') {
        if(!keys.includes(83) ){
            keys.push(83)
        }
    }
    if (direction == 'right') {
        if(!keys.includes(68) ){
            keys.push(68)
        }
    }
}

let gameInterval = setInterval(function () {
    let enemy = document.createElement("img")
    enemy.classList.add("enemy")
    enemy.src = "creeper.png"
    let enemyY = Math.random() * (game.offsetHeight - 100)
    enemy.style.top = enemyY + "px"
    enemy.setAttribute("data-x", 0)
    enemy.setAttribute("data-y", enemyY)
    game.appendChild(enemy)
}, 500)
setInterval(() => {
    for (let key of keys) {
        let X = 0
        let Y = 0
        if (key == 65) {
            X = -5
        }
        else if (key == 68) {
            X = 5
        }
        else if (key == 87) {
            Y = -5
        }
        else if (key == 83) {
            Y = 5
        }else if (key == 32) {
         shoot()
        }
        heroCoords[0] = heroCoords[0] + X
        heroCoords[1] = heroCoords[1] + Y
        if (heroCoords[0] < 0) {
            heroCoords[0] = 0
        }
        if (heroCoords[0] > (game.offsetWidth - 100)) {
            heroCoords[0] = game.offsetWidth - 100
        }
        if (heroCoords[1] > (game.offsetWidth - 58)) {
            heroCoords[1] = game.offsetWidth - 58
        }
        if (heroCoords[1] < 0) {
            heroCoords[1] = 0
        }
        hero.style.left = heroCoords[0] + "px"
        hero.style.top = heroCoords[1] + "px"
    }
    let enemies = document.getElementsByClassName("enemy")
    let bubbles = document.getElementsByClassName("bubble")
    if (enemies.length > 0) {
        for (let index = 0; index < enemies.length; index++) {
            let creeper = enemies[index]
            let newx = parseInt(creeper.getAttribute("data-x")) + 1
            creeper.setAttribute("data-x", newx)
            creeper.style.left = newx + "px"
            if (parseInt(creeper.getAttribute("data-x")) > (game.offsetWidth - 150)) {
                creeper.remove()
            }
            for (let index = 0; index < bubbles.length; index++) {
                let bubble = bubbles[index]
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
            if (parseInt(bubble.getAttribute("data-x")) < 50 || index > 3) {
                bubble.remove()
            }
        }
    }
}, 10);
// добавить счет