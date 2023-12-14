class TicTacToeGame {
    constructor(boardElement) {
        this.boardElement = boardElement;
        this.currentPlayer = 'X';
        this.board = ['', '', '', '', '', '', '', '', ''];

        this.renderBoard();
        this.boardElement.addEventListener('click', (event) => this.handleCellClick(event));
    }

    handleCellClick(event) {
        const cellIndex = Array.from(this.boardElement.children).indexOf(event.target);
        if (this.board[cellIndex] === '') {
                this.board[cellIndex] = this.currentPlayer;
                this.renderBoard();
            if (this.checkWinner()) {
                console.log(`Player ${this.currentPlayer} wins!`);
                this.restart();
            } else if (!this.board.includes('')) {
                console.log('It\'s a draw!');
                this.restart();
            } else {
                console.log(`Player ${this.currentPlayer} made a move at cell ${cellIndex}`);
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return true;
            }
        }

        return false;
    }

    renderBoard() {
        this.boardElement.innerHTML = '';
        this.board.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = value;
            this.boardElement.appendChild(cell);
        });
    }

    restart() {
        this.currentPlayer = 'X';
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.renderBoard();
        console.log('Game restarted');
    }
}