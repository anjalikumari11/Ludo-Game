let playerRed = true;

let player1 = document.createElement("div");
player1.classList.add("player1");

let player2 = document.createElement("div");
player2.classList.add("player2");

let player1Position = 0;
let isPlayer1Enabled = false;
let isPlayer2Enabled = false;
let player2Position = 0;


const lobby = document.querySelector(".start");
const firstmove = document.querySelector(".firstmove");
const secondmove = document.querySelector(".secondmove");

const snake = document.querySelector(".snake");
const snake2 = document.querySelector(".snake2");
const extramove = document.querySelector(".extramove");
let msg_box = document.querySelector(".msg-container");
let gameOver = false;

lobby.append(player1);
lobby.append(player2);

// any random no. from 1 to 6
let dice = {
    sides: 6,
    roll: function () {
        let dicenumber = Math.floor(Math.random() * this.sides) + 1;
        return dicenumber;
    }
}

function showresult(num, color) {
    let rolledDice = document.getElementById("RolledDice");
    rolledDice.innerHTML = num;
    rolledDice.style.backgroundColor = color;
}

// gameStart
function gameStart(player) {
    // let startbox = document.getElementById("1");
    if (player === "playerRed") {
        msg_box.style.display = 'none';
        lobby.removeChild(player1);
        player1Position = 1;
        isPlayer1Enabled = true;
        movePlayer(player1Position.toString(), player);
        console.log("number 6");
    }
    else {
        msg_box.style.display = 'none';
        lobby.removeChild(player2);
        player2Position = 1;
        isPlayer2Enabled = true;
        movePlayer(player2Position.toString(), player);
    }
}

function movePlayer(id, player) {
    if (player == "playerRed") {
        player1 = document.createElement("div");
        player1.classList.add("player1");
        document.getElementById(id).appendChild(player1);
    }
    else {
        player2 = document.createElement("div");
        player2.classList.add("player2");
        document.getElementById(id).appendChild(player2);
    }
}


// function movePlayer(id, player) {
//     const targetCell = document.getElementById(id);
//     if (!targetCell) {
//         console.error(`Cell with ID ${id} not found.`);
//         return;
//     }
//     if (player === "playerRed") {
//         targetCell.appendChild(player1); // Reuse the existing player1 element
//     } else {
//         targetCell.appendChild(player2); // Reuse the existing player2 element
//     }
// }


// click roll dice button
let button = document.querySelector(".dice");
button.addEventListener("click", function () {
    if (gameOver) {
        return;
    }

    if (playerRed) {
        console.log('rolled a dice');
        let result = dice.roll();
        showresult(result, "red");
        if (result === 6 && isPlayer1Enabled === false) {
            gameStart("playerRed");
        } else {
            if (isPlayer1Enabled) {
                document.getElementById(player1Position.toString()).removeChild(player1);
                player1Position = player1Position + result;

                // if (player1Position !== 4 || player1Position !== 10 || player1Position !== 31) {
                if (player1Position <= 31) {
                    msg_box.style.display = 'none';
                    movePlayer(player1Position.toString(), "playerRed");
                    playerRed = false;
                } else {
                    msg_box.style.display = 'none';
                    player1Position = player1Position - result;
                    movePlayer(player1Position.toString(), "playerRed");
                    playerRed = false;
                }
                // }

                if (player1Position === 4) {
                    console.log("Extra Step : 4");
                    firstmove.removeChild(player1);
                    player1Position += 3;
                    movePlayer(player1Position.toString(), "playerRed");
                    msg_box.style.display = 'block';
                    msg_box.innerHTML = ` You got 3 extra steps player red `;
                }

                if (player1Position === 14) {
                    console.log("Extra Step : 2");
                    secondmove.removeChild(player1);
                    player1Position += 2;
                    movePlayer(player1Position.toString(), "playerRed");
                    msg_box.style.display = 'block';
                    msg_box.innerHTML = ` You got 3 extra steps player red `;
                }


                if (player1Position === 10) {
                    console.log("out")
                    snake.removeChild(player1);
                    lobby.append(player1);
                    isPlayer1Enabled = false;
                    msg_box.style.display = 'block';
                    msg_box.innerHTML = ` OOPS!! snake`;
                }

                if (player1Position === 25) {
                    console.log("out")
                    snake2.removeChild(player1);
                    lobby.append(player1);
                    isPlayer1Enabled = false;
                    msg_box.style.display = 'block';
                    msg_box.innerHTML = ` OOPS!! snake`;
                }

                if (player1Position === 22) {
                    console.log("one more chance")
                    isPlayer1Enabled = true;
                    msg_box.style.display = 'block';
                    msg_box.innerHTML = `yaahuuu one more move!! pls roll a dice again`;
                    playerRed = true;
                    return;
                }


                if (player1Position === 31) {
                    console.log("win")
                    msg_box.style.display = 'block';
                    msg_box.innerHTML = "🎉 Player Red won!! 🎉";
                    gameOver = true;
                }

            } else {
                playerRed = false;

            }
        }
    }
    else {
        let result = dice.roll();
        showresult(result, "blue");

        if (result === 6 && isPlayer2Enabled === false) {
            gameStart("playerBlue");
            playerRed = true;

        } else {
            if (isPlayer2Enabled) {
                document.getElementById(player2Position.toString()).removeChild(player2);
                player2Position = player2Position + result;

                // if (player2Position !== 4 || player2Position !== 10 || player2Position !== 31) {
                if (player2Position <= 31) {
                    msg_box.style.display = 'none';
                    movePlayer(player2Position.toString(), "playerBlue");
                    playerRed = true;
                } else {
                    msg_box.style.display = 'none';
                    player2Position = player2Position - result;
                    movePlayer(player2Position.toString(), "playerBlue");
                    playerRed = true;
                }
                // }
                if (player2Position === 4) {
                    console.log("Extra Step : 3");
                    firstmove.removeChild(player2);
                    player2Position += 3;
                    movePlayer(player2Position.toString(), "playerBlue");
                    msg_box.style.display = 'block';
                    msg_box.innerHTML = ` You got 3 extra steps player Blue `;
                }

                if (player2Position === 10) {
                    snake.removeChild(player2);
                    lobby.append(player2);
                    isPlayer2Enabled = false;
                    msg_box.style.display = 'block';
                    msg_box.innerHTML = ` OOPS!! snake`;
                    playerRed = true;
                }

                if (player2Position === 14) {
                    console.log("Extra Step : 2");
                    secondmove.removeChild(player2);
                    player2Position += 2;
                    movePlayer(player2Position.toString(), "playerBlue");
                    msg_box.style.display = 'block';
                    msg_box.innerHTML = ` You got 3 extra steps player Blue `;
                }

                if (player2Position === 25) {
                    console.log("out")
                    snake2.removeChild(player2);
                    lobby.append(player2);
                    isPlayer1Enabled = false;
                    msg_box.style.display = 'block';
                    msg_box.innerHTML = ` OOPS!! snake`;
                }

                if (player2Position === 22) {
                    isPlayer2Enabled = true;
                    msg_box.style.display = 'block';
                    msg_box.innerHTML = `yaahuuu one more move!! pls roll a dice again`;
                    // movePlayer(player2Position.toString(), "playerBlue");
                    playerRed = false;
                    return;
                }

                if (player2Position === 31) {
                    msg_box.style.display = 'block';
                    msg_box.innerHTML = "🎉 Player Blue won!! 🎉";
                    gameOver = true;
                }
            }
            else {
                playerRed = true;

            }
        }

    }
})