import React, { useState } from 'react';
import './Board.css';

const WORLD_SIZE = 25;
const WORLD_POPULATION = Math.round(WORLD_SIZE * WORLD_SIZE * 0.25);

const Board = (props) => {
    const [world, setWorld] = useState(
        createWorld(WORLD_SIZE, WORLD_POPULATION)
    );
    const [generation, setGenerarion] = useState(1);

    return (
        <>
            <h1>Game Of Live - Generation {generation}</h1>
            <div className="world">
                {world.board.map((row, rowIdx) => (
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

class World {
    constructor(size, population) {
        this.size = size;
        this.currentPopulation = 0;
        this.population = population;
        this.board = [];
        this.createBoard();
    }

    createBoard() {
        for (let y = 0; y < this.size; y++) {
            this.board[y] = [];
            for (let x = 0; x < this.size; x++) {
                const isAlive = Math.round(Math.random());
                this.board[y][x] = new Cell(x, y, isAlive);
                this.population++;
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

const createWorld = (WORLD_SIZE, WORLD_POPULATION) => {
    const board = new World(WORLD_SIZE, WORLD_POPULATION);
    return board;
};

const getCellClassName = (cellValue, board) => {
    let className = 'cell';
    if (cellValue === 1) {
        className = 'cell cell-red';
    }
    return className;
};

export default Board;