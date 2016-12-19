var readline = require('readline');

/**
 * NOTE: state is now an integer, meaning:
 * 0: dead cell, was also dead in previous generation
 * 1: alive cell, was also alive in previous generation
 * 2: has just died, i.e. is dead now, but was alive in previous generation
 * 3: has just come alive, i.e. is alive now, but was dead in previous generation
 */
const CELL_STATE_DEAD = 0;
const CELL_STATE_ALIVE = 1;
const CELL_STATE_JUST_DIED = 2;
const CELL_STATE_JUST_CAME_ALIVE = 3;

module.exports = {

    // checks whether given state is alive or not
    isAlive: function(state) {

        return ((state === CELL_STATE_ALIVE) || (state === CELL_STATE_JUST_CAME_ALIVE));
    },

    // implements game of life rules
    nextState: function(currentState, neighbourCount) {

        // if cell is alive...
        if (module.exports.isAlive(currentState)) {

            return ((neighbourCount === 2) || (neighbourCount === 3))? CELL_STATE_ALIVE: CELL_STATE_JUST_DIED;
        }
        // ... else, cell is dead
        else {

            return (neighbourCount === 3)? CELL_STATE_JUST_CAME_ALIVE: CELL_STATE_DEAD;
        }
    },

    // counts elements in an array that contain alive cells
    countLivingCells: function(cells) {

        return cells.filter(function(a) {

            return module.exports.isAlive(a);

        }).length;
    },

    // prints out complete board
    printBoard: function(board, index) {

        console.log('Round: ' + index);

        board.forEach(function(line) {

            var s = '';
            line.forEach(function(state) {

                var c = module.exports.isAlive(state)? '\u2588\u258a': '\u2591\u2591';

                // change color for cells that have just died or have just come alive
                if ((state === CELL_STATE_JUST_DIED) || (state === CELL_STATE_JUST_CAME_ALIVE)) {

                    c = '\x1b[36m' + c + '\x1b[0m';
                }
                s += c;
            });
            console.log(s);
        });

        readline.moveCursor(process.stdout, 0, -(board.length + 1));
    },

    // return new board with next generation
    tick: function(board) {

        var height = board.length;

        return board.map(function(line, x) {

            var width = line.length;

            return line.map(function(state, y) {

                // wrap neighbour cells around all edges of board
                var xBefore = (x === 0)? height - 1: x - 1;
                var xAfter = (x === (height - 1))? 0: x + 1;

                var yBefore = (y === 0)? width - 1: y - 1;
                var yAfter = (y === (width - 1))? 0: y + 1;

                return module.exports.nextState(state, module.exports.countLivingCells([

                    board[xBefore][yBefore], board[xBefore][y], board[xBefore][yAfter],
                    board[x][yBefore], board[x][yAfter],
                    board[xAfter][yBefore], board[xAfter][y], board[xAfter][yAfter]
                ]));
            });
        });
    },

    // create initial board
    init: function(height, width, offsetX, offsetY, seedBoard) {

        return Array.from({length: height}, function(v, x) {

            return Array.from({length: width}, function(v, y) {

                // if within seed board, copy it in
                var seedX = x - offsetX;
                var seedY = y - offsetY;
                if ((seedX >= 0) && (seedX < seedBoard.length) && (seedY >= 0) && (seedY < seedBoard[seedX].length)) {

                    return (seedBoard[seedX].charAt(seedY) !== '.')? CELL_STATE_ALIVE: CELL_STATE_DEAD;
                }

                // else, leave cell empty
                return CELL_STATE_DEAD;
            });
        });
    },

    // main game loop
    loop: function(board, index, duration) {

        module.exports.printBoard(board, index);

        setTimeout(function() {

            module.exports.loop(module.exports.tick(board), index + 1, duration);

        }, duration);
    }
};
