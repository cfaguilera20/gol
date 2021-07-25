import React, { useState } from 'react';

const WORLD_SIZE = 50;

const World = (props) => {
    const [world, setBoard] = useState(createWorld(WORLD_SIZE));
    const [generation, setHeigh] = useState(1);

    return (
        <>
            <h1>Game Of Live - Generation {generation}</h1>
            <div className="board">
                {board.map((row, rowIdx) => (
                    <div key={rowIdx} className="row">
                        {row.map((cellValue, cellIdx) => {
                            const className = getCellClassName(
                                cellValue,
                                foodCell,
                                foodShouldReverseDirection,
                                snakeCells
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

const createWorld = (WORLD_SIZE) => {
    let counter = 1;
    const world = [];
    for (let row = 0; row < WORLD_SIZE; row++) {
        const currentRow = [];
        for (let col = 0; col < WORLD_SIZE; col++) {
            currentRow.push(counter++);
        }
        world.push(currentRow);
    }
    return world;
};

export default World;
