import ForwardIcon from "@mui/icons-material/Forward";
import { Box, Button, Paper, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "./Title";

const resolution = 20;
const numRows = 20;
const numCols = 20;

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0)));
  }
  return rows;
};

const LifeGame: React.FC = () => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });
  const [running, setRunning] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  const handleCellClick = (i: number, j: number) => {
    setGrid((currentGrid) => {
      const newGrid = currentGrid.map((row, y) =>
        row.map((cell, x) => (y === i && x === j ? (cell ? 0 : 1) : cell))
      );
      return newGrid;
    });
  };

  const updateGrid = () => {
    setGrid((currentGrid) => {
      return currentGrid.map((row, y) =>
        row.map((cell, x) => {
          let liveNeighbors = 0;
          for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
              if (i === 0 && j === 0) continue;
              const y2 = (y + i + numRows) % numRows;
              const x2 = (x + j + numCols) % numCols;
              liveNeighbors += currentGrid[y2][x2];
            }
          }

          if (cell === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
            return 0;
          } else if (cell === 0 && liveNeighbors === 3) {
            return 1;
          } else {
            return cell;
          }
        })
      );
    });
  };

  useEffect(() => {
    if (!running) {
      return;
    }
    const interval = setInterval(() => {
      updateGrid();
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [running]);

  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          minWidth: "100vw",
          backgroundColor: "background.default",
        }}
      >
        <Title />
        <Paper
          elevation={3}
          sx={{
            display: "grid",
            gridTemplateRows: `repeat(${numRows}, ${resolution}px)`,
            gridTemplateColumns: `repeat(${numCols}, ${resolution}px)`,
            gap: "1px",
            backgroundColor: "grey.500",
          }}
        >
          {grid.map((row, i) =>
            row.map((col, j) => (
              <Paper
                key={`${i}-${j}`}
                elevation={col ? 4 : 0}
                sx={{
                  width: `${resolution}px`,
                  height: `${resolution}px`,
                  backgroundColor: col ? "common.black" : "common.white",
                }}
                onMouseUp={() => {
                  if (!mouseDown) {
                    handleCellClick(i, j);
                  }
                  setMouseDown(false);
                }}
                onMouseDown={() => {
                  setMouseDown(true);
                  handleCellClick(i, j);
                }}
                onMouseOver={() => {
                  if (mouseDown) {
                    handleCellClick(i, j);
                  }
                }}
              />
            ))
          )}
        </Paper>
        <Box marginY={4}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={() => {
                setRunning(!running);
              }}
            >
              {running ? "停止" : "再生"}
            </Button>
            {/* 世代を1つ進めるボタンを追加 */}
            <Button
              variant="contained"
              disabled={running}
              onClick={() => {
                updateGrid();
              }}
            >
              <ForwardIcon />
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default LifeGame;
