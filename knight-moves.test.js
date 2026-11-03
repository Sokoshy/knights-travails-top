import { describe, expect, test } from "bun:test";
import { knightMoves } from "./knight-moves.js";

const BOARD_SIZE = 8;

const isOnBoard = (square) => {
  if (!Array.isArray(square)) return false;
  const [x, y] = square;
  return (
    Number.isInteger(x) &&
    Number.isInteger(y) &&
    x >= 0 &&
    x < BOARD_SIZE &&
    y >= 0 &&
    y < BOARD_SIZE
  );
};

const isKnightStep = ([ax, ay], [bx, by]) => {
  const dx = Math.abs(ax - bx);
  const dy = Math.abs(ay - by);
  return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
};

// Several shortest paths can exist, so we check validity and length instead
// of comparing against one exact path.
function expectValidPath(path, start, end) {
  expect(Array.isArray(path)).toBe(true);
  expect(path.length).toBeGreaterThan(0);
  expect(path[0]).toEqual(start);
  expect(path[path.length - 1]).toEqual(end);

  expect(path.filter((square) => !isOnBoard(square))).toEqual([]);

  const illegalSteps = [];
  for (let i = 1; i < path.length; i += 1) {
    if (!isKnightStep(path[i - 1], path[i])) {
      illegalSteps.push([path[i - 1], path[i]]);
    }
  }
  expect(illegalSteps).toEqual([]);
}

describe("knightMoves", () => {
  test("returns only the start when start and end are the same square", () => {
    expect(knightMoves([3, 3], [3, 3])).toEqual([[3, 3]]);
  });

  test("returns both squares for a single move", () => {
    expect(knightMoves([0, 0], [1, 2])).toEqual([
      [0, 0],
      [1, 2],
    ]);
  });

  test("finds a shortest path of 2 moves", () => {
    const path = knightMoves([0, 0], [3, 3]);
    expectValidPath(path, [0, 0], [3, 3]);
    expect(path.length - 1).toBe(2);
  });

  test("finds the same distance in reverse", () => {
    const path = knightMoves([3, 3], [0, 0]);
    expectValidPath(path, [3, 3], [0, 0]);
    expect(path.length - 1).toBe(2);
  });

  test("finds a shortest path of 6 moves across the board", () => {
    const path = knightMoves([0, 0], [7, 7]);
    expectValidPath(path, [0, 0], [7, 7]);
    expect(path.length - 1).toBe(6);
  });

  test("finds the 3-move path from the lesson example", () => {
    const path = knightMoves([3, 3], [4, 3]);
    expectValidPath(path, [3, 3], [4, 3]);
    expect(path.length - 1).toBe(3);
  });

  test("finds the 4-move path to a nearby diagonal square", () => {
    const path = knightMoves([0, 0], [1, 1]);
    expectValidPath(path, [0, 0], [1, 1]);
    expect(path.length - 1).toBe(4);
  });

  test("finds a shortest path of 5 moves along an edge", () => {
    const path = knightMoves([0, 0], [7, 0]);
    expectValidPath(path, [0, 0], [7, 0]);
    expect(path.length - 1).toBe(5);
  });
});
