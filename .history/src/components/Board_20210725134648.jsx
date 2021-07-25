import React, { useState } from 'react';
import './Board.css';

const WORLD_SIZE = 25;
const WORLD_POPULATION = 5;

const Board = (props) => {
    const [world, setWorld] = useState(
        createWorld(WORLD_SIZE, WORLD_POPULATION)
    );
    const [generation, setGeneration] = useState(1);

    const onNextGeneration = () => {
        setGeneration(generation + 1);
        world.nextGeneration();
        setWorld(world);
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
                        {row.map((isAlive, cellIdx) => {
                            const className = isAlive
                                ? 'cell cell-green'
                                : 'cell';
                            const neighborsAlive =
                                world.getNeighborsAliveCounter(rowIdx, cellIdx);
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
                const isAlive =
                    Math.random() > this.population / 100 ? true : false;
                this.board[y][x] = isAlive;
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

    getNeighborsAlive(x, y) {
        return this.getNeighbors(x, y).filter((isAlive) => isAlive);
    }

    getNeighborsAliveCounter(x, y) {
        return this.getNeighborsAlive(x, y).length;
    }

    nextGeneration() {
        const nextBoard = [];
        for (let y = 0; y < this.size; y++) {
            nextBoard[y] = [];
            for (let x = 0; x < this.size; x++) {
                const isAlive = this.board[y][x];
                const nextIsAlive = this.getNeighborsAliveCounter(x, y) > 2;
                nextBoard[y][x] = nextIsAlive;
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
