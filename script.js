const game = (function () {
    let board = ["adg", "ae", "afh", "bd", "begh", "bf", "cdh", "ce", "cfg"];
    const winner = document.querySelector(".winner");
    const _run = (player) => {
        let sorted = player.squares.split('').sort().join('');
        return /a{3}|b{3}|c{3}|d{3}|e{3}|f{3}|g{3}|h{3}/.test(sorted);
    }
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
        _resetBoard();
    }
    const _declareWinner = (player) => {
        winner.textContent = `${player.name} wins!`
        player.score += 1;
        const newRound = document.querySelector(".new-round");
        const button = document.createElement("button");
        button.textContent = "Play again?";
        newRound.appendChild(button);
        button.addEventListener("click", _newRound);
    }
    const play = (square) => {
        players[currentPlayer].squares += board[square];
        if (_run(players[currentPlayer])) _declareWinner(players[currentPlayer]);
        _togglePlayer();
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