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

const createWorld = (size) => {};

export default World;
