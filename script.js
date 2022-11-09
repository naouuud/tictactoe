const game = (function () {
    const board = ["adg", "ae", "afh", "bd", "begh", "bf", "cdh", "ce", "cfg"];
    const _run = (player) => {
        let sorted = player.squares.split('').sort().join('');
        return /a{3}|b{3}|c{3}|d{3}|e{3}|f{3}|g{3}|h{3}/.test(sorted);
    }
    const newRound = () => {
        players.forEach(player => player.squares = "");
    }
    const reset = () => {
        players = [];
    }
    const play = (player, square) => {
        players[player].squares += board[square];
        if (_run(players[player])) declareWinner(players[player]);
    }
    const declareWinner = (player) => {
        console.log(`${player.name} is the winner!`)
        player.score += 1;
        newRound();
    }
    return { play };
})();

function addPlayer(name) {
    const newPlayer = { name, squares: "", score: 0 };
    players.push(newPlayer);
}

const players = [];
addPlayer("jenny");
addPlayer("timmy");