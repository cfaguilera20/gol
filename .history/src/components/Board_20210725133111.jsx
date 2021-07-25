import React, { useState } from 'react';
import './Board.css';

const WORLD_SIZE = 25;
const WORLD_POPULATION = 0.25;

const Board = (props) => {
    const [world, setWorld] = useState(
        createWorld(WORLD_SIZE, WORLD_POPULATION)
    );
    const [generation, setGeneration] = useState(1);

    const onNextGeneration = () => {
        setGeneration(generation + 1);

        const clone = JSON.parse(JSON.stringify(world));

        setWorld(clone);
    };

    return (
        <>
            <h1>
                Game Of Live - Generation {generation} (
                {world.currentPopulation})
            </h1>
            <button onClick={onNextGeneration}>Next Generation</button>
            <div className="world">
                {world.board.map((row, rowIdx) => (
                    <div key={rowIdx} className="row">
                        {row.map((cell, cellIdx) => {
                            const className = cell.getColor();
                            const neighborsAlive =
                                world.getNeighborsAliveCounter(cell);
                            return (
                                <div key={cellIdx} className={className}>
                                    {neighborsAlive}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </>
    );
};

class Cell {
    constructor(world, x, y, isAlive) {
        this.world = world;
        this.x = x;
        this.y = y;
        this.isAlive = isAlive;
    }

    getColor() {
        return this.isAlive ? 'cell cell-green' : 'cell';
    }
}

class World {
    constructor(size, population) {
        this.size = size;
        this.population = population;
        this.currentPopulation = 0;
        this.board = [];
        this.createBoard();
    }

    createBoard() {
        for (let y = 0; y < this.size; y++) {
            this.board[y] = [];
            for (let x = 0; x < this.size; x++) {
                const isAlive = Math.random() > 0.9 ? 1 : 0;
                this.board[y][x] = new Cell(this, x, y, isAlive);
                this.currentPopulation += isAlive ? 1 : 0;
            }
        }
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

    getNeighborsAlive(cell) {
        return this.getNeighbors(cell.x, cell.y).filter(
            (cellItem) => cellItem.isAlive === 1
        );
    }

    getNeighborsAliveCounter(cell) {
        return this.getNeighborsAlive(cell).length;
    }

    nextGeneration() {
        const nextBoard = [];
        for (let y = 0; y < this.size; y++) {
            nextBoard[y] = [];
            for (let x = 0; x < this.size; x++) {
                const cell = this.board[y][x];
                const isAlive = cell.isAlive;
                const nextIsAlive = this.getNeighborsAliveCounter(cell) > 2;
                nextBoard[y][x] = new Cell(this, x, y, nextIsAlive);
                this.currentPopulation += nextIsAlive - isAlive;
            }
        }

        this.board = nextBoard;
        return this;
    }
}

const createWorld = (WORLD_SIZE, WORLD_POPULATION) => {
    const board = new World(WORLD_SIZE, WORLD_POPULATION);
    return board;
};

export default Board;
