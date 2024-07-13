let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newGame = document.querySelector("#newGame");
let msgDis = document.querySelector(".msgcon");
let message = document.querySelector("#msg");
let turn0 = true; // turn of player (X, O)
let draw = true;
let count = 0;
let winner = '';
const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const DisableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const Display = (Winner) => {
    message.innerText = `Congratulations! ${Winner}`;
    msgDis.classList.remove("hide");
    DisableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                if(pos1==="X")
                 Display("You Won the match");
                else
                 Display("You Lost,AI won the match");
                draw = false;
                return true;
            }
        }
    }
    return false;
};

const makeAiMove = () => {
    let availableMoves = [];
    boxes.forEach((box, index) => {
        if (box.innerText === "") {
            availableMoves.push(index);
        }
    });
    
    if (availableMoves.length > 0) {
        let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        boxes[move].innerText = "O";
        boxes[move].disabled = true;
        count++;
        if (checkWinner()) return;
        if (count === 9) {
            Display("The match is Draw");
        }
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "X";
            box.disabled = true;
            turn0 = false;
            count++;
            if (checkWinner()) return;
            if (count === 9) {
                Display("The match is Draw");
                return;
            }
            makeAiMove();
            turn0 = true;
        }
    });
});

const Draw = () => {
    if (count === 9) {
        if (!draw) console.log("not a draw");
        else Display("The match is Draw");
    }
};

const resetAct = () => {
    turn0 = true;
    draw = true;
    count = 0;
    enableBoxes();
    msgDis.classList.add("hide");
};

reset.addEventListener("click", resetAct);
newGame.addEventListener("click", resetAct);
