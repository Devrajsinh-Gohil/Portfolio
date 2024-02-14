"use client"
import { useState, useEffect } from 'react';
import styles from '@/styles/play.module.css';



function Square({ value, onSquareClick }) {
    return (
        <button className={styles.square} onClick={onSquareClick}>
            {value}
        </button>
    );
}

let count = 0;
export default function Board() {
    const [playerSymbol, setPlayerSymbol] = useState("X");
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    
    useEffect(() => {
        if (!xIsNext && count > 0) {
            const bestMove = getBestMove(squares, playerSymbol);
            handleClick(bestMove);
        }
    }, [xIsNext]);

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? playerSymbol : getOpponentSymbol(playerSymbol);
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
        count++;
    }
    
    const winner = calculateWinner(squares);
    let status;
    if(winner === -1) {
        status = "Tie";
        count = 0;
    }
    else if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Player turn: " + (xIsNext ? playerSymbol : getOpponentSymbol(playerSymbol));
    }

    function handleSymbolChange(e) {
        setPlayerSymbol(e.target.value);
    }

    function handleReset() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    }

    return (
        <>
            <div>
                <label>
                    Select your symbol:
                    <select value={playerSymbol} onChange={handleSymbolChange}>
                        <option value="X">X</option>
                        <option value="O">O</option>
                    </select>
                </label>
            </div>
            <div className={styles.status}>{status}</div>
            <div className={styles.board_row}>
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className={styles.board_row}>
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className={styles.board_row}>
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
            <button onClick={handleReset}>reset</button>
        </>
    );
}

function calculateWinner(squares) {
    if(count === 9) {
        return -1;
    }
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function getBestMove(board, playerSymbol) {
    let bestScore = -Infinity;
    let bestMove;
    count = 0;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            board[i] = getOpponentSymbol(playerSymbol);
            let score = minimax(board, 0, false);
            board[i] = null;
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}

const scores = {
    X: -1,
    O: 1,
    tie: 0
};

function minimax(board, depth, isMaximizingPlayer) {
    let result = calculateWinner(board);
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizingPlayer) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = "O";
                let score = minimax(board, depth + 1, false);
                board[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = "X";
                let score = minimax(board, depth + 1, true);
                board[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function getOpponentSymbol(playerSymbol) {
    return playerSymbol === "X" ? "O" : "X";
}
