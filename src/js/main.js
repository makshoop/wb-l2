document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const restartBtn = document.getElementById('restartBtn');
    
    const game = new TicTacToeGame(board);

    restartBtn.addEventListener('click', () => {
        game.restart();
    });
});
