<?php

class Cell
{
    private $x;
    private $y;

    public function __construct($x, $y, $value)
    {
        $this->x = $x;
        $this->y = $y;
        $this->value = $value;
    }

    public function getX()
    {
        return $this->x;
    }
    public function getY()
    {
        return $this->y;
    }
    public function getValue()
    {
        return $this->value;
    }
    public function setValue($value)
    {
        return $this->value = $value;
    }
}

interface BoardInterface
{
    public function __construct(int $size);
    public function setCell(Cell $cell) : BoardInterface;
    public function getCell(int $x, int $y);
    public function getSize(): int;
    public function getRows(): array;
}

class Board implements BoardInterface
{
    private $size;
    private $rows;

    public function __construct(int $size)
    {
        $this->size = $size;
        return $this;
    }

    public function setCell(Cell $cell) : BoardInterface
    {
        $this->rows[$cell->getX()][$cell->getY()] = $cell;
        return $this;
    }

    public function getCell(int $x, int $y) : Cell
    {
        return $this->rows[$x][$y];
    }

    public function getSize() : int
    {
        return $this->size;
    }

    public function getRows() : array
    {
        return $this->rows;
    }

    public function getNeighbors(Cell $cell) : array
    {
        $neighbors = [];
        $neighborsIdx = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
        ];

        foreach ($neighborsIdx as $idx) {
            $nx = $idx[0] + $cell->getX();
            $ny = $idx[1] + $cell->getY();

            if ($nx >= 0 && $nx < $this->size && $ny >= 0 && $ny < $this->size) {
                $neighbors[] = $this->rows[$ny][$nx];
            }
        };

        return $neighbors;
    }
}

interface OutputInterface
{
    public function print(GOL $game);
}

class ScreenOutputService implements OutputInterface
{
    public function print(GOL $game)
    {
        $rows = $game->getBoard()->getRows();
        $rowsData = [];

        foreach ($rows as $cells) {
            $cellsData = [];
            foreach ($cells as $cell) {
                $cellsData[] = $cell->getValue() ? '['.$game->getNeighborsAliveCounter($cell).']' : '('.$game->getNeighborsAliveCounter($cell).')' ;
            }

            $rowsData[] = implode(",", $cellsData);
        }

        echo implode(PHP_EOL, $rowsData);
        echo PHP_EOL;
        echo '------------------------------------';
        echo PHP_EOL;
    }
}


class GOL
{
    private $board;
    private $size =  10;

    public function __construct(Board $board, OutputInterface $output)
    {
        $this->board = $board;
        $this->output = $output;
        return $this;
    }

    public function getBoard()
    {
        return $this->board;
    }

    public function init()
    {
        for ($i = 0; $i < $this->board->getSize(); $i++) {
            for ($j = 0; $j < $this->board->getSize(); $j++) {
                $isAlive = rand(0, 100) > 90;
                $this->board->setCell(new Cell($i, $j, $isAlive));
            }
        }

        $this->output->print($this);
        $this->getNextGeneration();
    }

    public function getNextGeneration()
    {
        sleep(1);
        $nextGeneration = array();
        for ($i = 0; $i < $this->board->getSize(); $i++) {
            for ($j = 0; $j < $this->board->getSize(); $j++) {
                $cell = $this->board->getCell($i, $j);
                $isAlive = $cell->getValue();
                $neighborsAlive = $this->getNeighborsAliveCounter($cell);
                // Any live cell with two or three live neighbours survives.
                $firstRule = $isAlive && ($neighborsAlive === 2 || $neighborsAlive === 3);
                // Any dead cell with three live neighbours becomes a live cell.
                $secondRule = !$isAlive && $neighborsAlive === 3;
                $nextAlive = $firstRule || $secondRule;

                $nextGeneration[$i][$j] = $nextAlive;
            }
        }

        for ($i = 0; $i < $this->board->getSize(); $i++) {
            for ($j = 0; $j < $this->board->getSize(); $j++) {
                $cell = $this->board->getCell($i, $j);
                $cell->setValue($nextGeneration[$i][$j]);
            }
        }

        $this->output->print($this);
        $this->getNextGeneration();
    }

    public function getNeighborsAliveCounter(Cell $cell)
    {
        $neighbors = $this->board->getNeighbors($cell);
        $neighborsAlive = array_filter($neighbors, function (Cell $cell) {
            return $cell->getValue();
        });

        return count($neighborsAlive);
    }
}

$board = new Board(10);
$screenOutput = new ScreenOutputService();
$game = new GOL($board, $screenOutput);
$game->init();
