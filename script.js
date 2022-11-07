const game = (function () {
    const board = [];
    const _augmentScore = player => player.score += 1;
    const _run = () => {
        for (let i = 0; i < 9; i++) {
            if (board[i] === board[i + 1] && board[i] === board[i + 2]) return board[i];
        }
    }
    const reset = () => {
        for (let i = 0; i < 9; i++) board[i] = {};
    }
    const fill = i => {
        if (!board[i].name) board[i] = player;
        _run();
        if (_run()) _augmentScore(_run());
    }
    return { fill, reset };
})();

function addPlayer(name) {
    const newPlayer = {name, score: 0};
    players.push(newPlayer);
}

const players = [];
game.reset();