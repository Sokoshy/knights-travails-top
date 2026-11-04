/**
 * Finds the shortest path a knight can take between two squares on an 8x8 board.
 *
 * @param {[number, number]} start - Starting square as [x, y], both 0-7.
 * @param {[number, number]} end - Ending square as [x, y], both 0-7.
 * @returns {Array<[number, number]>} Every square on the path, start and end included.
 */
export function knightMoves(start, end) {
  let discovered = [];
  let queue = [start];
  let parent = new Map();
  let possibility = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];

  if (start.toString() === end.toString()) {
    return [end];
  }

  while (true) {
    if (end.toString() === queue[0].toString()) {
      let travel = [end];
      let curr = end;
      while (parent.get(curr.toString()).toString() !== start.toString()) {
        travel.push(parent.get(curr.toString()));
        curr = parent.get(curr.toString());
      }
      travel.push(start);
      return travel.reverse();
    }
    for (let i = 0; i < possibility.length; i++) {
      const next = [
        queue[0][0] + possibility[i][0],
        queue[0][1] + possibility[i][1],
      ];
      if (next[0] >= 0 && next[0] < 8 && next[1] >= 0 && next[1] < 8) {
        if (
          !discovered.some(
            (currDiscovered) =>
              next[0] === currDiscovered[0] && next[1] === currDiscovered[1],
          )
        ) {
          queue.push(next);
          discovered.push(next);
          parent.set(next.toString(), queue[0]);
        }
      }
    }

    queue.shift();
  }
}
