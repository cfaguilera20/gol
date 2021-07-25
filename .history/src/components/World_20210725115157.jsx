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
                        {row.map((cellValue, cellIdx) => {
                            const className = getCellClassName(
                                cellValue,
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

const createWorld = (WORLD_SIZE) => {
    const world = [];
    for (let row = 0; row < WORLD_SIZE; row++) {
        const currentRow = [];
        for (let col = 0; col < WORLD_SIZE; col++) {
            const isAlive = Math.round(Math.random());
            const cell = new Cell(row, row, isAlive);
            currentRow.push(cell);
        }
        world.push(currentRow);
    }
    return world;
};

const getCellClassName = (cellValue, board) => {
    let className = 'cell';
    if (cellValue === 1) {
        className = 'cell cell-red';
    }
    return className;
};

export default World;
