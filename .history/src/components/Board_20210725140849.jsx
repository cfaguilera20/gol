import React, { useState } from 'react';
import './Board.css';

const WORLD_SIZE = 25;
const WORLD_POPULATION = 90;

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
                            const neighborsAlive =
                                world.getNeighborsAliveCounter(cellIdx, rowIdx);

                            const className = isAlive
                                ? 'cell cell-green'
                                : 'cell';

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

    getNeighborsAliveCounter(x, y) {
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
                if (this.board[ny][nx] === true) {
                    neighbors.push(true);
                }
            }
        });

        return neighbors.length;
    }

    nextGeneration() {
        const nextBoard = [];
        for (let y = 0; y < this.size; y++) {
            nextBoard[y] = [];
            for (let x = 0; x < this.size; x++) {
                const isAlive = this.board[y][x];
                const neighborsAlive = this.getNeighborsAliveCounter(x, y);
                // Any live cell with two or three live neighbours survives.
                const firstRule = isAlive && (neighborsAlive === 2 || neighborsAlive === 3);
                // Any dead cell with three live neighbours becomes a live cell.
                const secondRule = !isAlive && neighborsAlive === 3;

                const nextIsAlive =  (isAlive && neighborsAlive > ) >= 2;
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
