const game = (function () {
    let squaresTaken = 0;
    let board = ["adg", "ae", "afh", "bd", "begh", "bf", "cdh", "ce", "cfg"];
    const winner = document.querySelector(".winner");
    const _togglePlayer = () => {
        if (currentPlayer === 0) currentPlayer = 1;
        else currentPlayer = 0;
    }
    const _resetBoard = () => {
        squares.forEach(square => {
            square.textContent = "";
            square.attributes.status.value = 'available';
        })
    }
    const _newRound = () => {
        players.forEach(player => player.squares = "");
        winner.textContent = "";
        const newRound = document.querySelector(".new-round");
        newRound.innerHTML = '';
        currentPlayer = 0;
        squares.forEach(square => square.addEventListener("click", go));
        _resetBoard();
    }
    const _declareWinner = (player) => {
        winner.textContent = `${player.name} wins!`
        player.score += 1;
    }
    const _endRound = (player) => {
        if (player) _declareWinner(player);
        squaresTaken = 0;
        squares.forEach(square => square.removeEventListener("click", go));
        const newRound = document.querySelector(".new-round");
        const button = document.createElement("button");
        button.textContent = "Play again?";
        newRound.appendChild(button);
        button.addEventListener("click", _newRound);
    }
    const _checkWinner = (player) => {
        let sorted = player.squares.split('').sort().join('');
        return /a{3}|b{3}|c{3}|d{3}|e{3}|f{3}|g{3}|h{3}/.test(sorted);
    }
    const _run = (square) => {
        players[currentPlayer].squares += board[square];
        squaresTaken++;
        if (_checkWinner(players[currentPlayer])) _endRound(players[currentPlayer]);
        else if (squaresTaken === 9) _endRound();
        _togglePlayer();
    }
    const play = (square) => {
        if (square.attributes.status.value === "taken") return;
        if (currentPlayer === 0) square.textContent = "X";
        else square.textContent = "O";
        square.attributes.status.value = "taken";
        const index = square.attributes.index.value;
        _run(index);
    }
    const reset = () => players = [];
    return { play, reset };
})();

function addPlayer(name) {
    const newPlayer = { name, squares: "", score: 0 };
    players.push(newPlayer);
}

let currentPlayer = 0;
let players = [];
addPlayer("X");
addPlayer("O");

// function createDOMElement(type, _class) {
//     return { type, _class };
// }

// function appendDOMElement(n, childObj, parentObj) {
//     const parent = document.createElement(parentObj.type);
//     parent.classList.add(parentObj._class);
//     for (let i = 0; i < n; i++) {
//         const child = document.createElement(childObj.type);
//         child.classList.add(childObj._class);
//         child.setAttribute("index", i);
//         parent.appendChild(child);
//     }
//     return parent;
// }