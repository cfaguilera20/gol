import React, { useState } from 'react';
import './World.css';

const WORLD_SIZE = 25;

const World = (props) => {
    const [world, setWorld] = useState(createWorld(WORLD_SIZE));
    const [generation, setGenerarion] = useState(1);

    return (
        <>
            <h1>Game Of Live - Generation {generation}</h1>
            <div className="world">
                {world.map((row, rowIdx) => (
                    <div key={rowIdx} className="row">
                        {row.map((cell, cellIdx) => {
                            const className = getCellClassName(
                                cell.value,
                                world
                            );
                            return (
                                <div key={cellIdx} className={className}></div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </>
    );
};

class Cell {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
    }
}

class Board {
    constructor(size) {
        this.size = size;
        this.board = [];
        this.createBoard();
    }

    createBoard() {
        for (let y = 0; y < this.size; y++) {
            this.board[y] = [];
            for (let x = 0; x < this.size; x++) {
                const isAlive = Math.round(Math.random());
                this.board[y][x] = new Cell(x, y, isAlive);
            }
        }
    }

    getCell(x, y) {
        return this.board[y][x];
    }

    setCell(x, y, value) {
        this.board[y][x].value = value;
    }

    getNeighbors(x, y) {
        const neighbors = [];
        const neighborsIdx = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
        ];
        neighborsIdx.forEach(([dx, dy]) => {
            const [nx, ny] = [x + dx, y + dy];
            if (nx >= 0 && nx < this.size && ny >= 0 && ny < this.size) {
                neighbors.push(this.board[ny][nx]);
            }
        });
        return neighbors;
    }
}

const createWorld = (WORLD_SIZE) => {
    const board = new Board(WORLD_SIZE);
    return board;
};

const getCellClassName = (cellValue, board) => {
    let className = 'cell';
    if (cellValue === 1) {
        className = 'cell cell-red';
    }
    return className;
};

export default World;
