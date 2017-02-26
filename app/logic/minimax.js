export default class MiniMax {

    static HUMAN = 'human'
    static AI = 'ai'

    minimax(newBoard, player) {
        const availablePositions = this.emptyPositions(newBoard);

        if (this.winning(newBoard, MiniMax.HUMAN))
            return { score: -10 };
        else if (this.winning(newBoard, MiniMax.AI))
            return { score: 10 };
        else if (availablePositions.length === 0)
            return { score: 0 };

        const moves = [];

        availablePositions.forEach((position) => {
            newBoard[position.y][position.x].selectedBy = player;

            const move = {
                position,
                score: this.minimax(newBoard, player === MiniMax.AI ?
                    MiniMax.HUMAN : MiniMax.AI).score
            };

            newBoard[position.y][position.x].selectedBy = null;

            moves.push(move);
        });

        return this.getBestMove(moves, player);
    }

    getBestMove(moves, player) {
        let bestMove;
        if (player === MiniMax.AI) {
            let bestScore = -10000;
            moves.forEach((move) => {
                if (move.score > bestScore) {
                    bestScore = move.score;
                    bestMove = move;
                }
            });
        } else {
            let bestScore = 10000;
            moves.forEach((move) => {
                if (move.score < bestScore) {
                    bestScore = move.score;
                    bestMove = move;
                }
            });
        }
        return bestMove;
    }

    emptyPositions(board) {
        const positions = [];

        for (let i = 0; i < board.length; i++)
            for (let j = 0; j < board.length; j++)
                if (!board[i][j].selectedBy) {
                    positions.push({
                        x: j,
                        y: i
                    });
                }

        return positions;
    }

    winning(board, player) {
        let winningDiagonal = true;
        for (let i = 0; i < board.length; i++) {
            let winningColumn = true;
            let winningRow = true;
            for (let j = 0; j < board.length; j++) {
                if (board[j][i].selectedBy !== player)
                    winningColumn = false;

                if (board[i][j].selectedBy !== player)
                    winningRow = false;

                if (!winningColumn && !winningRow)
                    break;
            }

            if (winningColumn || winningRow)
                return true;

            if (board[i][i].selectedBy !== player)
                winningDiagonal = false;
        }

        return winningDiagonal;
    }
}
