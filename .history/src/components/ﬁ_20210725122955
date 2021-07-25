import React, { useState } from 'react';
import './Board.css';

const WORLD_SIZE = 25;
const WORLD_POPULATION = Math.round(WORLD_SIZE * WORLD_SIZE * 0.25);

const Board = (props) => {
    const [world, setWorld] = useState(
        createWorld(WORLD_SIZE, WORLD_POPULATION)
    );
    const [generation, setGeneration] = useState(1);

    const onNextGeneration = () => {
        setGeneration(generation + 1);
        world.nextGeneration();
    };

    return (
        <>
            <h1>Game Of Live - Generation {generation}</h1>
            <button onClick={onNextGeneration}>Next Generarion</button>
            <div className="world">
                {world.board.map((row, rowIdx) => (
                    <div key={rowIdx} className="row">
                        {row.map((cell, cellIdx) => {
                            const className = cell.getColor();
                            const neighborsAlive =
                                cell.getNeighborsAliveCounter();
                            return (
                                <div key={cellIdx} className={className}>
                                    {neighborsAlive} a
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

    getNeighbors() {
        const neighbors = [];
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                neighbors.push(this.world[y][x]);
            }
        }
        return neighbors;
    }

    getNeighborsAlive() {
        return this.getNeighbors().filter((cell) => cell.isAlive);
    }

    getNeighborsAliveCounter() {
        return this.getNeighborsAlive().length;
    }

    getColor() {
        return this.isAlive ? 'cell' : 'cell cell-red';
    }

    nextGeneration() {
        return this.getNeighborsAliveCounter() > 2;
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
                this.board[y][x] = new Cell(this, x, y, isAlive);
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

    nextGeneration() {
        const nextBoard = [];
        for (let y = 0; y < this.size; y++) {
            nextBoard[y] = [];
            for (let x = 0; x < this.size; x++) {
                const cell = this.getCell(x, y);
                const isAlive = cell.isAlive;
                const nextIsAlive = cell.nextGeneration();
                nextBoard[y][x] = new Cell(this, x, y, nextIsAlive);
                this.currentPopulation += nextIsAlive - isAlive;
            }
        }
        this.board = nextBoard;
    }
}

const createWorld = (WORLD_SIZE, WORLD_POPULATION) => {
    const board = new World(WORLD_SIZE, WORLD_POPULATION);
    return board;
};

export default Board;
