"use client"
import { useState } from 'react';
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
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
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
        status = "Player turn: " + (xIsNext ? "X" : "O");
    }


    return (
        <>
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
            <button onClick={() => {setSquares(Array(9).fill(null)); count = 0;}}>reset</button>
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